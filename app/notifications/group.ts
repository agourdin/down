import { getUserId } from "../../firebase/firestore/auth";
import { HEADERS, isExpoPushToken, URL } from "./utils";

/**
 * handles sending out notifications to fellow group members for various
 * member actions (new chat message, down status changed to true)
 *
 * @param name notifying user's name.
 * @param gid group id for the group to notify.
 * @param groupName name of the group to notify.
 * @param members the members object of the group to notify.
 * @param lastMessage the last message being broadcast.
 * @returns `Promise<Response | undefined>`
 */
export const sendGroupNotifications = async (
  gid: string,
  members: any,
  title: string,
  text: string
) => {
  // if there is no message to send, then return.
  if (!text) return;

  let to: string[] = [];

  // otherwise, go through group members:
  Object.keys(members).forEach(async (uid: string) => {
    // if group member is in the seenBy list, do nothing;
    if (uid === getUserId()) return;
    // otherwise, get their expo push token
    let expoPushToken = members[uid].expoPushToken;
    // and if it's a valid push token add it to the to list.
    if (isExpoPushToken(expoPushToken)) to.push(expoPushToken);
  });

  // if there are no valid push tokens to send to, then return
  if (to.length === 0) return;

  // otherwise, construct message object
  let message = {
    to: to,
    title: title,
    body: text,
    data: { gid: gid },
  };

  // and post it to expo
  return await fetch(URL, {
    method: "POST",
    body: JSON.stringify(message),
    headers: HEADERS,
  });
};
