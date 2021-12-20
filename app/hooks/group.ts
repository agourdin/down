import { DocumentData, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";
import { db } from "../../firebase/firebase";
import {
  addMessageToChat,
  Chat,
  getGroupDocRef,
  Group,
  LastMessage,
  Member,
  Members,
  NewGroup,
  newMember,
  UpdateGroup,
} from "../../firebase/firestore/groups";
import {
  getPrivateDataDocRef,
  getUserDocRef,
} from "../../firebase/firestore/users";
import { nestedFieldPath } from "../../firebase/firestore/utils";
import { sendGroupNotifications } from "../notifications/group";
import { DownErrorCode, DownErrorMessages } from "../../utils/errors";
import { validChatText } from "../../utils/validators";
import { useNameAndIcon } from "./global";

/**
 * a hook for easily accessing a group's inividual pieces of
 * data.
 *
 * @param uid the user id of the accessing user.
 * @param groupData the group data to use.
 */
export const useGroupData = ({
  uid,
  groupData,
}: {
  uid: string;
  groupData: Group | Data<DocumentData, "", ""> | undefined;
}) => {
  const [groupName, setGroupName] = useState<string>("");
  const [groupIcon, setGroupIcon] = useState<string>("");
  const [self, setSelf] = useState<Member>(newMember());
  const [members, setMembers] = useState<Members>({ [uid]: self });
  const [lastMessage, setLastMessage] = useState<LastMessage>({
    content: {
      uid: uid,
      timestamp: Timestamp.now(),
      text: "",
    },
    seenBy: [uid],
  });
  const [chat, setChat] = useState<Chat>({
    lastMessage: lastMessage,
    messages: [],
  });
  const [unseenMessages, setUnseenMessages] = useState<boolean>(false);

  useEffect(() => {
    if (groupData) {
      setGroupName(groupData.name ?? groupName);
      setGroupIcon(groupData.icon ?? groupIcon);
      setSelf(groupData.members[uid] ?? self);
      setMembers(groupData.members ?? members);
      setLastMessage(groupData.chat?.lastMessage ?? lastMessage);
      setChat(groupData.chat ?? chat);
      setUnseenMessages(
        groupData.chat?.messages?.length > 0 &&
          groupData.chat?.lastMessage.seenBy.indexOf(uid) === -1
      );
    }
  }, [groupData]);

  return {
    groupData,
    groupName,
    groupIcon,
    members,
    self,
    chat,
    lastMessage,
    unseenMessages,
  };
};

/**
 * a hook for accessing and editing a group's basic data (name and icon).
 *
 * @param gid a group id.
 */
export const useEditGroup = (gid: string) => {
  // basic group data
  const ref = getGroupDocRef(db, gid);
  const [groupData, groupDataLoading, groupDataError] = useDocumentData(ref);
  const { name, icon, errors, setName, setIcon, validateNameAndIcon } =
    useNameAndIcon(groupData);

  const handleSave = async (callback: () => any) => {
    const data: UpdateGroup = {
      name: name,
      icon: icon,
    };
    if (validateNameAndIcon()) {
      await setDoc(ref, data, { mergeFields: ["name", "icon"] });
      return callback();
    }
  };

  return {
    groupData,
    groupDataLoading,
    groupDataError,
    name,
    icon,
    errors,
    setName,
    setIcon,
    handleSave,
  };
};

/**
 * a hook for updating a user's own member's data in a group (name, icon, expoPushToken).
 *
 * @param uid a user id.
 * @param gid a group id.
 * @param self the current self object (a {@link Member} object) to reference.
 */
export const useUpdateSelfMemberData = ({
  uid,
  gid,
  self,
}: {
  uid: string;
  gid: string;
  self: Member;
}) => {
  const [userData] = useDocumentData(getUserDocRef(db, uid));
  const [privateData] = useDocumentData(getPrivateDataDocRef(db, uid));
  const [currName, setCurrName] = useState("");
  const [currIcon, setCurrIcon] = useState("");
  const [currPushToken, setCurrPushToken] = useState("");

  useEffect(() => {
    if (userData) {
      setCurrName(userData.name);
      setCurrIcon(userData.icon);
    }
    if (privateData) {
      setCurrPushToken(privateData.expoPushToken);
    }
  }, [userData, privateData]);

  let data: any = {};
  let path = ["members", uid];
  useEffect(() => {
    if (self) {
      if (currName && self.name !== currName) {
        data[nestedFieldPath([...path, "name"])] = currName;
      }
      if (currIcon && self.icon !== currIcon) {
        data[nestedFieldPath([...path, "icon"])] = currIcon;
      }
      if (currPushToken && self.expoPushToken !== currPushToken) {
        data[nestedFieldPath([...path, "expoPushToken"])] = currPushToken;
      }
      if (Object.getOwnPropertyNames(data).length !== 0) {
        updateDoc(getGroupDocRef(db, gid), data).catch((error) =>
          console.error(error)
        );
      }
    }
  }, [currName, currIcon, currPushToken]);
};

/**
 * hook for interacting with a group's chat.
 *
 * @param uid a user id.
 * @param gid a group id.
 */
export const useChat = ({
  uid,
  gid,
  name,
  members,
  groupName,
}: {
  uid: string;
  gid: string;
  name: string;
  members: Members;
  groupName: string;
}) => {
  const [text, setText] = useState("");
  const [errors, setErrors] = useState("");

  /**
   * validates `text` and sets `textErrors`.
   * @returns `true` if valid, `false` otherwise.
   */
  const validateText = () => {
    try {
      return validChatText(text);
    } catch (error: any) {
      let code: DownErrorCode = error.code;
      setErrors(DownErrorMessages[code]);
      return false;
    }
  };

  /**
   * submits a message to the chat and clears the text input.
   */
  const submitMessage = async () => {
    if (text.trim() === "") return setText("");
    if (validateText()) {
      await addMessageToChat(db, gid, uid, text);
      setText("");
      let title = `${name} in ${groupName}`;
      return sendGroupNotifications(gid, members, title, text);
    }
  };

  useEffect(() => {
    // clear errors when text changes.
    setErrors("");
  }, [text]);

  return {
    text,
    setText,
    errors,
    submitMessage,
  };
};
