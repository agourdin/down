import { Auth } from "@firebase/auth";
import {
  NO_NO_WORDS_REGEX,
  VALID_GROUP_AND_USER_ICONS,
  ALL_VALID_ICONS,
} from "../firebase/firestore/constants";
import { DownError } from "../utils/errors";

/**
 * validates a chat message.
 *
 * @param text a text string.
 * @returns true if the chat message is valid. throws an error otherwise.
 */
export const validChatText = (text: string) => {
  if (text.length > 500) throw new DownError("message-too-long");
  if (text.toLowerCase().match(NO_NO_WORDS_REGEX))
    throw new DownError("poor-word-choice");
  return true;
};

/**
 * validates an email.
 *
 * @param email <string> the first instance of the input email.
 * @param email2 <string> the second instance of the input email.
 * @param auth (optional) an Auth instance to use to check if the provided
 * email belongs to the current user.
 *
 */
export function validEmails(email: string, email2?: string, auth?: Auth | any) {
  if (email === "" || email2 === "") throw new DownError("email-empty");
  if (email2 && email !== email2) throw new DownError("email-mismatch");
  if (auth && email === auth.currentUser?.email)
    throw new DownError("email-is-own-email");
  return true;
}

/**
 * validates an icon against VALID_GROUP_AND_USER_ICONS.
 *
 * @param icon <string> the icon to validate
 * @returns true if the icon is valid. throws an error otherwise.
 */
export function validGroupOrUserIcon(icon: string | undefined) {
  if (icon && VALID_GROUP_AND_USER_ICONS.indexOf(icon) < 0) {
    throw new DownError("icon-invalid");
  }
  return true;
}

/**
 * validates an icon against ALL_VALID_ICONS.
 *
 * @param icon <string> the icon to validate
 * @returns true if the icon is valid. throws an error otherwise.
 */
export function validIcon(icon: string) {
  if (ALL_VALID_ICONS.indexOf(icon) < 0) {
    throw new DownError("icon-invalid");
  }
  return true;
}

/**
 * validates a name.
 *
 * @param name <string> the name to check
 * @returns true if the group name is valid. throws an error
 * otherwise.
 */
export function validName(name: string | undefined) {
  if (!name) {
    throw new DownError("name-empty");
  }
  if (name.match(NO_NO_WORDS_REGEX)) throw new DownError("poor-word-choice");
  if (name.length < 3) throw new DownError("name-too-short");
  if (name.length > 25) throw new DownError("name-too-long");
  return true;
}

/**
 * validates a password or pair of password inputs.
 *
 * @param password1 <string> the first instance of the input password.
 * @param password2 <string> the second instance of the input password.
 */
export function validPasswords(password1: string, password2?: string) {
  if (password1 === "" || password2 === "")
    throw new DownError("password-empty");
  if (password2 && password1 !== password2)
    throw new DownError("password-mismatch");
  return true;
}
