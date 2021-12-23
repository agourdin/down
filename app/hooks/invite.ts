import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { RootStackParamList } from "../../App";
import { auth, db } from "../../firebase/firebase";
import { getUserEmail } from "../../firebase/firestore/auth";
import { FIRESTORE } from "../../firebase/firestore/constants";
import { handleGroupMembershipUpdate } from "../../firebase/firestore/groups";
import {
  createGroupInviteDoc,
  newGroupInvite,
  setInviteDoc,
  updateGroupInviteDoc,
} from "../../firebase/firestore/invites";
import {
  DownError,
  DownErrorCode,
  DownErrorMessages,
} from "../../utils/errors";
import { validEmails } from "../../utils/validators";
import { useUser } from "./user";

/**
 * hook for accessing a user's group invites.
 *
 * @returns
 */
export const useGroupInvites = () => {
  const ref = collection(
    db,
    FIRESTORE.PATHS.INVITES,
    getUserEmail(),
    FIRESTORE.PATHS.GROUPS
  );
  const [groupInvites, groupInvitesLoading, groupInvitesError] =
    useCollection(ref);

  // filter for pending invites
  const pendingInvites = groupInvites?.docs.filter((doc) => {
    return doc.data().status === FIRESTORE.INVITES.STATUSES.PENDING;
  });

  // create flag for pending invites
  const hasPendingInvites = pendingInvites
    ? pendingInvites.length > 0
      ? true
      : false
    : false;

  return {
    groupInvites,
    groupInvitesLoading,
    groupInvitesError,
    hasPendingInvites,
  };
};

/**
 * hook for sending app and group invites.
 *
 * @param gid a group id.
 * @param uid a user id.
 * @returns
 */
export const useInvite = ({ gid, uid }: { gid?: string; uid?: string }) => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = async () => {
    try {
      if (validEmails(email, email, auth)) {
        console.log("gid: ", gid, "uid: ", uid);
        if (gid && uid) {
          if (await createGroupInviteDoc(db, email, gid, newGroupInvite(uid))) {
            setSuccess("");
            throw new DownError("invited-to-group");
          }
        } else {
          if (await setInviteDoc(db, email)) {
            setSuccess("");
            throw new DownError("invited-to-app");
          }
        }
        return setSuccess("invite sent!");
      }
    } catch (error: any) {
      let code: DownErrorCode = error.code;
      return setErrors(DownErrorMessages[code]);
    }
  };

  useEffect(() => {
    // clear messages when email changes
    setErrors("");
    setSuccess("");
  }, [email]);

  return {
    email,
    setEmail,
    success,
    errors,
    handleSubmit,
  };
};

/**
 * hook for responding to active invites.
 *
 * @param uid a user id.
 * @param gid a group id.
 * @returns
 */
export const useActiveInvite = ({ uid, gid }: { uid: string; gid: string }) => {
  const email = getUserEmail();
  const { name, icon } = useUser(uid);
  const [accepted, setAccepted] = useState(false);
  const [ignored, setIgnored] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleInvite = async (action: "accepted" | "ignored") => {
    // set flags
    setIgnored(action === "ignored");
    setAccepted(action === "accepted");
    // handle updating the invite's status
    await updateGroupInviteDoc(db, email, gid, action);
    if (action === "accepted") {
      // handle joining user to group
      await handleGroupMembershipUpdate(db, uid, gid, "join", {
        name,
        icon,
      });
    }

    const timer = setTimeout(() => {
      // clear loading/ignored flags so user can access buttons again
      setIgnored(false);
      navigation.pop();
      navigation.pop();
      navigation.navigate("GroupHome", { uid: uid, gid: gid });
      clearTimeout(timer);
      return;
    }, 500);
  };

  return {
    accepted,
    ignored,
    handleInvite,
  };
};
