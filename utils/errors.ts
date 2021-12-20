export declare type DownErrorCode =
  | "auth/invalid-email"
  | "auth/email-already-in-use"
  | "auth/weak-password"
  | "auth/wrong-password"
  | "email-empty"
  | "email-is-own-email"
  | "email-mismatch"
  | "icon-invalid"
  | "internal-error"
  | "invite-does-not-exist"
  | "invited-to-app"
  | "invited-to-group"
  | "message-too-long"
  | "name-empty"
  | "name-too-long"
  | "name-too-short"
  | "password-empty"
  | "password-mismatch"
  | "poor-word-choice"
  | "user-not-found";

export const DownErrorMessages = {
  "auth/invalid-email": "that's not a valid email!",
  "auth/email-already-in-use": "that email is already in use!",
  "auth/weak-password": "that password is weak yo!",
  "auth/wrong-password": "wrong password!",
  "email-empty": "email can't be empty!",
  "email-is-own-email": "that's your own email!",
  "email-mismatch": "emails don't match!",
  "icon-invalid": "pick an icon from the list!",
  "internal-error": "something went wrong, try again!",
  "invite-does-not-exist": "ack! that invite doesn't exist anymore...",
  "invited-to-app": "they've already been invited to the app!",
  "invited-to-group": "they've already been invited to the group!",
  "message-too-long": "chat messages can't be more than 500 characters!",
  "name-empty": "names can't be empty!",
  "name-too-long": "names can't be more than 25 characters!",
  "name-too-short": "names must be at least three characters!",
  "password-empty": "password can't be empty!",
  "password-mismatch": "passwords don't match!",
  "poor-word-choice": "please don't use that kind of language.",
  "user-not-found": "that user wasn't found!",
};

/**
 * generates an error with code and message.
 *
 * @param code <string> a DownErrorCode.
 */
export class DownError extends Error {
  constructor(code: DownErrorCode) {
    super();
    this.code = code;
    this.message = DownErrorMessages[code];
    // set the prototype explicitly.
    Object.setPrototypeOf(this, DownError.prototype);
  }
  code;
  message;
}
