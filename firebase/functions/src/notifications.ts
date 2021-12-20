import { Expo, ExpoPushMessage, ExpoPushToken } from "expo-server-sdk";
import * as functions from "firebase-functions";

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
// (-> from https://docs.expo.io/push-notifications/sending-notifications/)
let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

export const sendIndividualNotification = async (
  pushToken: ExpoPushToken,
  sound:
    | "default"
    | {
        critical?: boolean | undefined;
        name?: "default" | null | undefined;
        volume?: number | undefined;
      }
    | null
    | undefined = "default",
  body: string,
  data: any
) => {
  // validate the push token
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    return;
  }
  // create the message to send
  const message: ExpoPushMessage = {
    to: pushToken,
    sound: sound,
    body: body,
    data: data,
  };
  try {
    let tickets = [];
    let ticketChunk = await expo.sendPushNotificationsAsync([message]);
    functions.logger.log(ticketChunk);
    tickets.push(...ticketChunk);
    // NOTE: If a ticket contains an error code in ticket.details.error, you
    // must handle it appropriately. The error codes are listed in the Expo
    // documentation:
    // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
  } catch (error) {
    console.error(error);
  }
};
