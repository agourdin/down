import Expo from "expo-server-sdk";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { sendIndividualNotification } from "./notifications";
import { deleteOldMessages } from "./utils";
const app = admin.initializeApp();

/**
 * performs operations on an updated group document.
 */
exports.onGroupUpdate = functions.firestore
  .document("groups/{gid}")
  .onUpdate((change, context) => {
    const gid = context.params.gid;
    let messages = change.after.data().chat.messages ?? [];
    let newMessages = deleteOldMessages(messages);
    if (messages.length === newMessages.length)
      return functions.logger.log(`no old chats to delete from group: ${gid}!`);
    admin
      .firestore(app)
      .doc("groups/" + gid)
      .update({ "chat.messages": newMessages })
      .then(() => {
        return functions.logger.log(`old chats deleted from group: ${gid}!`);
      })
      .catch(() => {
        return functions.logger.log(
          `something went wrong trying to delete old chats from group: ${gid}`
        );
      });
  });

exports.sendGroupInviteNotification = functions.firestore
  .document("invites/{uid}/groups/{gid}")
  .onCreate((snapshot, context) => {
    const { gid, uid } = context.params;
    const inviterId = snapshot.data().invitedBy;
    admin
      .firestore(app)
      .doc("users/" + inviterId)
      .get()
      .then((inviterUserDoc) => {
        const inviterName = inviterUserDoc.data()?.name;
        admin
          .firestore(app)
          .doc("users/" + uid + "/private/data")
          .get()
          .then((privateDataDoc) => {
            const pushToken = privateDataDoc.data()?.expoPushToken;
            if (!Expo.isExpoPushToken(pushToken))
              return functions.logger.log(
                `something went wrong trying send group invite notification from ${inviterId} to ${uid} to join ${gid} -- push token not valid: ${pushToken}!`
              );
            admin
              .firestore(app)
              .doc("groups/" + gid)
              .get()
              .then((groupDoc) => {
                const groupName = groupDoc.data()?.name;
                const body = `${inviterName} invited you to join ${groupName}!`;
                const data: { type: keyof InviteNotificationTypes } = {
                  type: "invited-to-group",
                };
                sendIndividualNotification(pushToken, "default", body, data)
                  .then(() => {
                    return functions.logger.log(
                      `group invite notification sent from ${inviterId} to ${uid} to join ${gid}!`
                    );
                  })
                  .catch((reason: any) => {
                    return functions.logger.log(
                      `something went wrong trying send group invite notification from ${inviterId} to ${uid} to join ${gid} -- reason: ${reason}!`
                    );
                  });
              })
              .catch((reason: any) => {
                return functions.logger.log(
                  `something went wrong trying send group invite notification from ${inviterId} to ${uid} to join ${gid} -- reason: ${reason}!`
                );
              });
          })
          .catch((reason: any) => {
            return functions.logger.log(
              `something went wrong trying send group invite notification from ${inviterId} to ${uid} to join ${gid} -- reason: ${reason}!`
            );
          });
      })
      .catch((reason: any) => {
        return functions.logger.log(
          `something went wrong trying send group invite notification from ${inviterId} to ${uid} to join ${gid} -- reason: ${reason}!`
        );
      });
  });

export declare type InviteNotificationTypes = {
  "invited-to-group": "invited-to-group";
};

exports.createMailDocForNewInvitee = functions.firestore
  .document("invites/{email}")
  .onCreate((snap, context) => {
    const inviteeEmail = context.params.email;
    admin
      .auth(app)
      .getUserByEmail(inviteeEmail)
      .then
      // do nothing if there is already a user with this email
      ()
      .catch(
        // create a new mail document if there is no user with this email
        () => {
          admin
            .firestore(app)
            .collection("mail")
            .add({
              to: [inviteeEmail],
              message: {
                subject: "you've been invited to join down!",
                text: `
            hi there! 👋 \n someone you know has invited you to join down, the app that encourages
            spontaneous hangouts with friends! you can download the app and create a free
            account here: https://getthedownapp.com \n
            \n
            (if you aren't interested, feel free to delete this message.)\n
            \n
            cheers,\n
            the down team
            `,
                html: `
            hi there! 👋 \n someone you know has invited you to join down, the app that encourages
            spontaneous hangouts with friends! you can download the app and create a free
            account here: https://getthedownapp.com \n
            \n
            (if you aren't interested, feel free to delete this message.)\n
            \n
            cheers,\n
            the down team
            `,
              },
            })
            .then(() => {
              return functions.logger.log(
                `new user invite sent to ${inviteeEmail}!`
              );
            })
            .catch(() => {
              return functions.logger.log(
                `something went wrong trying to create the mail document :(`
              );
            });
        }
      );
  });
