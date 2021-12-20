import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth,
  sendPasswordResetEmail,
  User,
  updatePassword,
  updateEmail,
  getAuth,
} from "firebase/auth";
import { FIRESTORE } from "./constants";
import app, { auth } from "../firebase";
import { validEmails, validPasswords } from "../../utils/validators";

/**
 * gets the current user given an Auth object.
 *
 * @param auth a Firebase Auth object.
 * @returns the current user object.
 */
export const getCurrentUser = (auth: Auth) => {
  return auth.currentUser;
};

/**
 * returns the given uid or gets the current user's uid if there is one.
 *
 * @param uid (optional) a uid to pass through.
 * @returns the uid of the current user or a special no user found string:
 * `"000--NO--USER--ID--FOUND--000"`
 */
export const getUserId = (uid?: string) => {
  if (uid) return uid;
  return (
    getAuth(app)?.currentUser?.uid ??
    // istanbul ignore next
    FIRESTORE.ERRORS.NO_USER_ID_FOUND
  );
};

/**
 * returns the given email or gets the current user's email if there is one.
 *
 * @param email (optional) an email to pass through.
 * @returns the email of the current user or a special no user found string:
 * `"000--NO--USER--EMAIL--FOUND--000"`
 */
export const getUserEmail = (email?: string) => {
  if (email) return email;
  return (
    getAuth(app)?.currentUser?.email ??
    //istanbul ignore next
    FIRESTORE.ERRORS.NO_USER_EMAIL_FOUND
  );
};

/**
 * handles signing a new user up with email. throws a coded error on failure.
 *
 * @param email user's email
 * @param password user's password
 * @param password2 user's password repeated (must match password)
 * @param setErrorMessage a set state function
 * to transmit error messages.
 */
export const signUpWithEmail = async (
  email: string,
  password: string,
  password2: string
): Promise<void | string | UserCredential> => {
  if (!validEmails(email)) return;
  if (!validPasswords(password, password2)) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

/**
 * handles signing a user in with their email and password. throws a coded
 * error on failure.
 *
 * @param email user's email
 * @param password user's password
 */
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<void | UserCredential> => {
  if (!validEmails(email)) return;
  if (!validPasswords(password)) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * handles sending a reset password email to the given email address.
 *
 * @param auth the current auth object.
 * @param email the email to reset the password for
 * @returns `<Promise<void>>`
 */
export const resetPassword = async (auth: Auth, email: string) => {
  if (!validEmails(email)) return;
  return await sendPasswordResetEmail(auth, email);
};

/**
 * handles changing the user's password.
 *
 * @param user the user object to change the password for.
 * @param password the new password.
 * @param password2 the new password, repeated.
 * @returns `<Promise<void>>`
 */
export const changePassword = async (
  user: User,
  password: string,
  password2: string
) => {
  if (!validPasswords(password, password2)) return;
  return await updatePassword(user, password);
};

/**
 * handles changing the user's email.
 *
 * @param user the user object to change the email for.
 * @param email the new email.
 * @param email2 the new email, repeated.
 * @returns `<Promise<void>>`
 */
export const changeEmail = async (
  user: User,
  email: string,
  email2: string
) => {
  if (!validEmails(email, email2)) return;
  return await updateEmail(user, email);
};
