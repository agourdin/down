import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Subscription } from "expo-modules-core";
import * as Notifications from "expo-notifications";
import { Notification } from "expo-notifications";
import { DocumentData } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";
import { RootStackParamList } from "../../App";
import { getUserId } from "../../firebase/firestore/auth";
import { db } from "../../firebase/firebase";
import { updateExpoPushToken } from "../../firebase/firestore/users";
import { registerForPushNotificationsAsync } from "../notifications/utils";
import { InviteNotificationTypes } from "../../firebase/functions/src";

/**
 * hook for getting and updating a user's expo push token for notifications.
 *
 * from https://docs.expo.dev/versions/latest/sdk/notifications/#api
 *
 * @returns the user's expo push token.
 */
export const useRegisterForPushNotificationsAsync = (
  privateData: Data<DocumentData, "", ""> | undefined
) => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  useEffect(() => {
    // update user's expoPushToken if it has changed
    if (
      privateData &&
      expoPushToken &&
      expoPushToken !== privateData.expoPushToken
    )
      updateExpoPushToken(db, getUserId(), expoPushToken);
  }, [expoPushToken, privateData]);

  return { expoPushToken };
};

/**
 * hook for listening to notifications and responses.
 *
 * from https://docs.expo.dev/versions/latest/sdk/notifications/#api
 *
 * @returns the latest notification.
 */
export const useNotifications = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [notification, setNotification] = useState<false | Notification>(false);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    notificationListener.current =
      // listen for notifications
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      // handle user reponses to notifications
      Notifications.addNotificationResponseReceivedListener((response) => {
        // get uid for navigation
        let uid = getUserId();
        // if it's a notification from a group
        let gid = response.notification.request.content.data.gid ?? "";
        if (gid && uid && typeof gid === "string") {
          navigation.navigate("GroupHome", { gid: gid, uid: uid });
        }
        // if it's a notification for an invite
        let type: keyof InviteNotificationTypes | "" | unknown =
          response.notification.request.content.data.type ?? "";
        if (type && type === "invited-to-group") {
          navigation.navigate("UserInvites", { uid: uid });
        }
      });

    return () => {
      // cleanup on unmount
      if (notificationListener.current)
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return { notification };
};
