import { doc, Firestore, setDoc } from "@firebase/firestore";
import { arrayRemove, arrayUnion, getDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE } from "./constants";

/*******************************************************************************************************

  types

*******************************************************************************************************/

export declare type DownUser = {
  name: string;
  icon: string;
};

export declare type PrivateData = {
  groups: string[];
  expoPushToken: string;
};

export declare type MembershipAction = "join" | "exit";

/*******************************************************************************************************

  user doc functions | users/{uid}

*******************************************************************************************************/

/**
 * gets a {@link DownUser}'s doc ref by uid.
 *
 * @param uid a user id
 * @returns the doc ref of the {@link DownUser} doc for the uid
 */
export const getUserDocRef = (db: Firestore | any, uid: string) => {
  return doc(db, `${FIRESTORE.PATHS.USERS}/${uid}`);
};

/*******************************************************************************************************

  private data doc functions | users/{uid}/private/data

*******************************************************************************************************/

/**
 * gets a {@link DownUser}'s {@link PrivateData} doc ref by uid.
 *
 * @param uid a user id
 * @returns the {@link PrivateData} doc ref of the user
 */
export const getPrivateDataDocRef = (db: Firestore | any, uid: string) => {
  return doc(
    db,
    FIRESTORE.PATHS.USERS,
    uid,
    FIRESTORE.PATHS.PRIVATE,
    FIRESTORE.PATHS.DATA
  );
};

/*******************************************************************************************************

  groups field | users/{uid}/private/data.groups

*******************************************************************************************************/

/**
 *
 * @param db a firestore instance
 * @param uid a user id
 * @param gid a group id
 * @param action a {@link MembershipAction}
 * @returns `Promise<void>`
 */
export const updatePrivateGroups = async (
  db: Firestore | any,
  uid: string,
  gid: string,
  action: MembershipAction
) => {
  let ref = getPrivateDataDocRef(db, uid);
  let privateDataDoc = await getDoc(ref);
  let groups = arrayUnion("");
  if (action === "join") groups = arrayUnion(gid);
  if (action === "exit") groups = arrayRemove(gid);
  if (!privateDataDoc.exists()) {
    return setDoc(ref, { groups: groups });
  }
  return await updateDoc(ref, "groups", groups);
};

/*******************************************************************************************************
      
  expoPushToken field | users/{uid}/private/data.expoPushToken

*******************************************************************************************************/

export const updateExpoPushToken = async (
  db: Firestore | any,
  uid: string,
  token: string
) => {
  let field = "expoPushToken";
  return await setDoc(
    getPrivateDataDocRef(db, uid),
    { [field]: token },
    { mergeFields: [field] }
  );
};
