import { setDoc } from "firebase/firestore";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/firebase";
import { DownUser, getUserDocRef } from "../../firebase/firestore/users";
import { useNameAndIcon } from "./global";

/**
 * hook for accessing and editing basic user data.
 *
 * @param uid a user id.
 * @returns
 */
export const useUser = (uid: string) => {
  const ref = getUserDocRef(db, uid);
  const [userDoc, userDocLoading, userDocError] = useDocument(ref);
  const [userData, userDataLoading, userDataError] = useDocumentData(ref);
  const { name, setName, icon, setIcon, errors, validateNameAndIcon } =
    useNameAndIcon(userData);

  const data: DownUser = {
    name: name,
    icon: icon,
  };

  const handleSave = async (callback: () => any) => {
    if (validateNameAndIcon()) {
      await setDoc(ref, data, { merge: true });
      return callback();
    }
  };

  return {
    userDoc,
    userDocLoading,
    userDocError,
    userData,
    userDataLoading,
    userDataError,
    name,
    setName,
    icon,
    setIcon,
    errors,
    handleSave,
  };
};
