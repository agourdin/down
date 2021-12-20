import { doc, Firestore, getDoc, updateDoc } from "@firebase/firestore";
import { deleteDoc, setDoc } from "firebase/firestore";
import { FIRESTORE, InviteStatuses } from "./constants";

/*******************************************************************************************************
 * types
 *******************************************************************************************************/

export declare type Invite = {};

export declare type NewGroupInvite = {
  invitedBy: string;
  status: InviteStatuses["pending"];
};

export declare type GroupInvite = {
  invitedBy: string;
  status: keyof InviteStatuses;
};

/*******************************************************************************************************

  invite doc-level functions | invite/{email}

*******************************************************************************************************/

/**
 * gets an {@link Invite} doc ref by email.
 *
 * @param db a firestore instance
 * @param email an email
 * @returns the invite doc for the email
 */
export const getInviteDocRef = (db: Firestore | any, email: string) => {
  return doc(db, FIRESTORE.PATHS.INVITES, email);
};

/**
 * creates a new {@link Invite} doc at invites/{email} if it doesn't exist. returns a promise
 * that resolves to void if the doc was created or true if the doc already exists.
 *
 * @param db a firestore instance
 * @param email an email
 * @returns `<Promise< true | void >>`
 */
export const setInviteDoc = async (db: Firestore | any, email: string) => {
  const inviteDoc = await getDoc(getInviteDocRef(db, email));
  const inviteDocExists = inviteDoc.exists();
  if (!inviteDocExists) {
    const data: Invite = {};
    return await setDoc(inviteDoc.ref, data);
  }
  return inviteDocExists;
};

/*******************************************************************************************************

  group invite doc-level functions | invite/{email}/groups/{gid}

*******************************************************************************************************/

/**
 * gets a {@link GroupInvite} doc ref by email and gid.
 *
 * @param db a firestore instance
 * @param email an email
 * @param gid a user id
 * @returns the {@link GroupInvite} doc ref for the email
 */
export const getGroupInviteDocRef = (
  db: Firestore | any,
  email: string,
  gid: string
) => {
  return doc(db, FIRESTORE.PATHS.INVITES, email, FIRESTORE.PATHS.GROUPS, gid);
};

/**
 * gets a {@link GroupInvite} doc by email and gid.
 *
 * @param db a firestore instance
 * @param email an email
 * @param gid a user id
 * @returns the {@link GroupInvite} doc for the email and gid
 */
export const getGroupInviteDoc = async (
  db: Firestore | any,
  email: string,
  gid: string
) => {
  return await getDoc(getGroupInviteDocRef(db, email, gid));
};

/**
 * sets new data {@link GroupInvite} on a object.
 *
 * @param uid uid to use for invitedBy
 * @returns a {@link GroupInvite}
 */
export const newGroupInvite = (uid: string): GroupInvite => {
  return {
    invitedBy: uid,
    status: FIRESTORE.INVITES.STATUSES.PENDING,
  };
};

/**
 * creates a new {@link GroupInvite} doc at invites/{email}/groups/{gid} if it doesn't exist. returns
 * a promise that resolves to void if the doc was created or true if the doc already exists.
 *
 * @param db a firestore instance
 * @param email email to create the doc for
 * @param gid gid to create the doc for
 * @param data a {@link GroupInvite} object
 * @returns `<Promise< true | void >>`
 */
export const createGroupInviteDoc = async (
  db: Firestore | any,
  email: string,
  gid: string,
  data: GroupInvite
) => {
  const inviteDoc = await getDoc(getInviteDocRef(db, email));
  const inviteDocExists = inviteDoc.exists();
  const invitesGroupDoc = await getDoc(getGroupInviteDocRef(db, email, gid));
  const invitesGroupDocExists = invitesGroupDoc.exists();
  if (!inviteDocExists) {
    await setDoc(inviteDoc.ref, {});
  }
  if (!invitesGroupDocExists) {
    return await setDoc(invitesGroupDoc.ref, data);
  } else {
    return invitesGroupDocExists;
  }
};

/**
 * updates a {@link GroupInvite} doc with the given status.
 *
 * @param db a firestore instance
 * @param email email to update the doc for
 * @param gid gid to update the doc for
 * @param status one of {@link InviteStatuses}
 * @returns `Promise<void>`
 */
export const updateGroupInviteDoc = async (
  db: Firestore | any,
  email: string,
  gid: string,
  status: string
) => {
  const data = { status: status };
  return await updateDoc(getGroupInviteDocRef(db, email, gid), data);
};

/**
 * deletes a {@link GroupInvite} doc.
 *
 * @param db a firestore instance
 * @param email email to delete the doc for
 * @param gid gid to delete the doc for
 * @returns `Promise<void>`
 */
export const deleteGroupInviteDoc = async (
  db: Firestore | any,
  email: string,
  gid: string
) => {
  return await deleteDoc(getGroupInviteDocRef(db, email, gid));
};
