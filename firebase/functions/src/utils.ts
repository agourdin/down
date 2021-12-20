import * as admin from "firebase-admin";

/**
 * takes a list of message objects of any length and returns a new list
 * with message objects older than 24hrs removed.
 *
 * @param messages a list of message objects of any length.
 * @returns a new list with messages older than 24 hours filtered out.
 */
export const deleteOldMessages = (messages: any[]) => {
  if (messages.length === 0) return messages;
  let newMessages = messages.filter(
    (message: {
      uid: string;
      timestamp: admin.firestore.Timestamp;
      text: string;
    }) =>
      !(
        (
          message.timestamp.toMillis() <
          admin.firestore.Timestamp.now().toMillis() - 1000 * 60 * 60 * 24
        ) // chats expire after 24 hours
      )
  );
  return newMessages;
};
