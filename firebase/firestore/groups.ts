import {
  arrayUnion,
  deleteField,
  doc,
  FieldValue,
  Firestore,
  setDoc,
  Timestamp,
  updateDoc,
} from "@firebase/firestore";
import { sendGroupNotifications } from "../../app/notifications/group";
import { getUserEmail } from "./auth";
import { FIRESTORE } from "./constants";
import { deleteGroupInviteDoc } from "./invites";
import { MembershipAction, updatePrivateGroups } from "./users";
import { nestedFieldPath } from "./utils";

/*******************************************************************************************************

  types

*******************************************************************************************************/

export declare type NewGroup = {
  name: string;
  icon: string;
  members: { [uid: string]: Member };
};

export declare type Group = {
  name: string;
  icon: string;
  members: Members;
  chat: Chat;
};

export declare type UpdateGroup = {
  name?: string;
  icon?: string;
  members?: Members;
  chat?: Chat | NewChat;
};

export declare type Members = {
  [uid: string]: Member;
};

export declare type Member = {
  name: string;
  icon: string;
  down: boolean;
  expoPushToken: string;
};

export declare type UpdateMember = {
  name?: string;
  icon?: string;
  down?: boolean;
  expoPushToken?: string;
};

export declare type MemberAction = MembershipAction | "update";

export declare type Message = {
  uid: string;
  timestamp: Timestamp;
  text: string;
};

export declare type LastMessage = {
  content: Message;
  seenBy: string[];
};

export declare type Messages = Message[];

export declare type Chat = {
  lastMessage: LastMessage;
  messages: Messages;
};

export declare type NewChat = {
  lastMessage: LastMessage;
  messages: FieldValue;
};

/*******************************************************************************************************

  group doc functions | groups/{gid}

*******************************************************************************************************/

/**
 * gets the {@link DocumentReference} for a {@link Group}.
 *
 * @param db the firestore object.
 * @param gid the group id.
 * @returns the {@link DocumentReference} for the {@link Group}.
 */
export const getGroupDocRef = (db: Firestore | any, gid: string) => {
  return doc(db, FIRESTORE.PATHS.GROUPS, gid);
};

/**
 * sets the data for a {@link Group} doc. creates the doc
 * if it doesn't exist.
 *
 * @param db a firestore instance.
 * @param gid a group id.
 * @param data a {@link Group}.
 * @returns
 */
export const setGroupDoc = async (
  db: Firestore | any,
  gid: string,
  data: Group | UpdateGroup
) => {
  return await setDoc(getGroupDocRef(db, gid), data, { merge: true });
};

/*******************************************************************************************************

  members field functions | groups.members

*******************************************************************************************************/

/**
 * @returns a new, blank {@link Member} object.
 */
export const newMember = (name?: string, icon?: string): Member => {
  return {
    name: name ?? "",
    icon: icon ?? "",
    expoPushToken: "",
    down: false,
  };
};

/**
 * creates a nested field path to the given user id's down status
 *  like: `members.{uid}.down`
 *
 * @param uid a user id.
 * @returns a nested field path to the user down status.
 */
export const makeMemberDownPath = (uid: string) => {
  return nestedFieldPath([FIRESTORE.PATHS.MEMBERS, uid, FIRESTORE.PATHS.DOWN]);
};

/**
 * joines/exits/updates a {@link Member} in a {@link Group}'s {@link Members}.
 *
 * @param db a firestore instance
 * @param uid a user id
 * @param gid a group id
 * @param flag `"join" | "exit" | "update"`
 * @param data (optional) new {@link Member} data to pass with `"update"` flag
 * @returns `Promise<void>`
 */
export const updateMember = async (
  db: Firestore | any,
  uid: string,
  gid: string,
  flag: "join" | "exit" | "update",
  data?: UpdateMember
) => {
  if (flag === "update" && !data) {
    throw new Error("must provide member data with the update flag");
  }
  const groupDocRef = getGroupDocRef(db, gid);
  if (flag !== "update") {
    let memberFieldPath;
    let memberData;
    memberFieldPath = nestedFieldPath([FIRESTORE.PATHS.MEMBERS, uid]);
    if (flag === "join") memberData = newMember(data?.name, data?.icon);
    if (flag === "exit") memberData = deleteField();
    data = { [memberFieldPath]: memberData };
  }
  return await updateDoc(groupDocRef, data);
};

/**
 * toggles the down status of a user and sends out group notifiations if the
 * user is toggling their status to down.
 *
 * @param db a firestore instance.
 * @param uid a user id.
 * @param gid a group id.
 * @param down current down status.
 * @param name the user's name.
 * @param groupName the group's name.
 * @param members the group's {@link Members}.
 */
export const toggleDown = async (
  db: Firestore | any,
  uid: string,
  gid: string,
  down: boolean,
  name: string,
  groupName: string,
  members: Members
) => {
  // down update
  const data = {
    [nestedFieldPath([FIRESTORE.PATHS.MEMBERS, uid, FIRESTORE.PATHS.DOWN])]:
      !down,
  };
  await updateMember(db, uid, gid, "update", data);

  // notifications
  if (!down && !locked) {
    lock(gid);
    unlock(LOCKOUT_DURATION);
    let title = groupName;
    let text = `${name} is down!`;
    sendGroupNotifications(gid, members, title, text);
  }
};
// lockout for toggleDown so users can't spam each other with "...is down!"
// notifications:
var lastgid: string;
var LOCKOUT_DURATION = 5000;
var locked = false;
const lock = (gid: string) => {
  if (gid === lastgid) {
    locked = true;
  } else {
    lastgid = gid;
  }
};
const unlock = (duration: number) =>
  setTimeout(() => (locked = false), duration);

/**
 * toggles the down status of a {@link Group}'s {@link Member} without
 * sending notifications.
 *
 * @param db a firestore instance.
 * @param uid a user id.
 * @param gid a group id.
 * @param down current down status.
 * @returns `Promise<void>`
 */
export const toggleDownSilently = async (
  db: Firestore | any,
  uid: string,
  gid: string,
  down: boolean
) => {
  const data = {
    [nestedFieldPath([FIRESTORE.PATHS.MEMBERS, uid, FIRESTORE.PATHS.DOWN])]:
      !down,
  };
  return await updateMember(db, uid, gid, "update", data);
};

/*******************************************************************************************************

  chat field functions | groups.chat

*******************************************************************************************************/

/**
 * creates a {@link Message} for updating a {@link Chat}'s {@link LastMessage} and {@link Messages}.
 *
 * @param uid a user id.
 * @param text the text for the message.
 * @returns a {@link Message} with a current {@link Timestamp}.
 */
export const newMessage = (uid: string, text: string): Message => {
  return {
    uid: uid,
    timestamp: Timestamp.now(),
    text: text,
  };
};

/**
 * creates a new {@link LastMessage}.
 *
 * @param uid a user id.
 * @param message a {@link Message}.
 * @returns the new {@link LastMessage}.
 */
export const newLastMessage = (uid: string, message: Message): LastMessage => {
  return {
    content: message,
    seenBy: [uid],
  };
};

/**
 * creates a new {@link Message} and constructs a new {@link Chat} with an updated
 * {@link LastMessage} and {@link Messages}.
 *
 * @param uid a user id
 * @param text the text for the message to add to the new {@link Chat}
 * @returns the new {@link Chat}
 */
export const newChat = (uid: string, text: string): NewChat => {
  const message = newMessage(uid, text);
  return {
    lastMessage: newLastMessage(uid, message),
    messages: arrayUnion(message),
  };
};

/**
 * adds a new {@link Message} to a {@link Group}'s {@link Chat}.
 *
 * handles:
 *
 * - creating a new {@link LastMessage}.
 * - adding the {@link Message} to the {@link Chat}'s {@link Messages}.
 *
 * @param db a firestore instance
 * @param uid a user id
 * @param gid a group id
 * @param text the text for the message
 * @returns the new {@link Chat}
 */
export const addMessageToChat = async (
  db: Firestore | any,
  gid: string,
  uid: string,
  text: string
) => {
  const newChatData = newChat(uid, text);
  const data: UpdateGroup = {
    chat: newChatData,
  };
  await setGroupDoc(db, gid, data);
  return newChatData;
};

/**
 * updates the `seenBy` field of a {@link Chat}'s {@link LastMessage}.
 *
 * @param db a firestore instance
 * @param gid a group id
 * @param newUid a user id
 * @returns `Promise<void>`
 */
export const updateSeenBy = async (
  db: Firestore | any,
  gid: string,
  newUid: string
) => {
  const groupDocRef = getGroupDocRef(db, gid);
  const newSeenByList = arrayUnion(newUid);
  const seenByFieldPath = nestedFieldPath([
    FIRESTORE.PATHS.CHAT,
    "lastMessage",
    "seenBy",
  ]);
  // note: for some reason setGroupDoc does not work here, even with mergeFields...
  // so leaving this as plain updateDoc for now.
  return await updateDoc(groupDocRef, { [seenByFieldPath]: newSeenByList });
};

/*******************************************************************************************************

  handlers

*******************************************************************************************************/

/**
 * handles:
 *
 * - adding/removing the user's data to/from the {@link Group}'s {@link Members}.
 * - adding/removing the {@link Group}'s id to/from the user's private groups list.
 *
 * @param db a firestore instance.
 * @param uid a user id.
 * @param gid a group id.
 * @returns `Promise<void>`
 */
export const handleGroupMembershipUpdate = async (
  db: Firestore | any,
  uid: string,
  gid: string,
  action: MembershipAction,
  data?: { name?: string; icon?: string }
) => {
  // add/remove the user to the group's members map
  await updateMember(db, uid, gid, action, data);
  // add/remove the group id to the user's private groups list
  return await updatePrivateGroups(db, uid, gid, action);
};

/**
 * handles:
 *
 * - removing the user from the {@link Group}'s {@link Members}.
 * - removing the group id from the user's private groups list.
 * - deleting the group invite doc (if there is one).
 *
 * @param db a firestore instance.
 * @param uid a user id.
 * @param gid a group id.
 */
export const handleExitGroup = async (
  db: Firestore | any,
  uid: string,
  gid: string
) => {
  // remove the group membership data
  await handleGroupMembershipUpdate(db, uid, gid, "exit");
  // delete the group invite doc from the user's invites collection
  return await deleteGroupInviteDoc(db, getUserEmail(), gid);
};
