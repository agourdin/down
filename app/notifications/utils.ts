import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

/**
 * from https://docs.expo.dev/versions/latest/sdk/notifications/#api
 */
export const URL = "https://exp.host/--/api/v2/push/send";
export const HEADERS = {
  host: "exp.host",
  accept: "application/json",
  "accept-encoding": "gzip, deflate",
  "content-type": "application/json",
};

export type ExpoPushToken = string;

/**
 * Returns `true` if the token is an Expo push token
 *
 * from: https://github.com/expo/expo-server-sdk-node/blob/master/src/ExpoClient.ts
 */
export const isExpoPushToken = (token: unknown): token is ExpoPushToken => {
  return (
    typeof token === "string" &&
    (((token.startsWith("ExponentPushToken[") ||
      token.startsWith("ExpoPushToken[")) &&
      token.endsWith("]")) ||
      /^[a-z\d]{8}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{12}$/i.test(token))
  );
};

/**
 * from https://docs.expo.dev/versions/latest/sdk/notifications/#api
 */
export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert(
        "notifications blocked! change this later in settings (if you want)."
      );
      token = "NOTIFICATIONS_BLOCKED";
      return token;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#F6511D",
    });
  }

  return token;
}
