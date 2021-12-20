import {
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { getAuth } from "firebase/auth";
import { DownError } from "../../../utils/errors";
import {
  changeEmail,
  changePassword,
  getCurrentUser,
  getUserEmail,
  getUserId,
  resetPassword,
  signInWithEmail,
  signUpWithEmail,
} from "../auth";
import { FIRESTORE } from "../constants";
import { mockAliceAuth, mockAliceUser } from "./firebase.mock";
import { TEST_ENV_OPTIONS, USERS, testdb } from "./firebase.testconfig";
let testEnv: RulesTestEnvironment;
let db: any;

describe("unit:", () => {
  /*******************************************************************************************************
  
    data defs
  
  *******************************************************************************************************/

  /*******************************************************************************************************
  
    setup
  
  *******************************************************************************************************/

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment(TEST_ENV_OPTIONS);

    return;
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
    db = testdb(USERS.ALICE, testEnv);
  });

  afterAll(async () => {
    await testEnv.cleanup();
    return;
  });

  /*******************************************************************************************************
  
    auth functions
  
  *******************************************************************************************************/

  describe("auth functions", () => {
    let uid = USERS.ALICE.uid;
    let email = USERS.ALICE.email;
    let password = "password123";
    let password2 = "123password";

    describe("getCurrentUser", () => {
      test("should return the current user", async () => {
        await signInWithEmail(email, password);
        expect(getCurrentUser(mockAliceAuth)?.email).toBe(email);
      });
    });

    describe("getUserEmail", () => {
      test("should return the current user's email if no email passed in", async () => {
        await signInWithEmail(email, password);
        expect(getUserEmail()).toBe(email);
      });
      test("should return a passed in email", () => {
        let email = "email@email.com";
        expect(getUserEmail(email)).toBe(email);
      });
    });

    describe("getUserId", () => {
      test("should return the current user's uid if no uid passed in", async () => {
        await signInWithEmail(email, password);
        expect(getUserId()).not.toEqual(FIRESTORE.ERRORS.NO_USER_ID_FOUND);
      });
      test("should return a passed in uid", () => {
        let uid = "userId123";
        expect(getUserId(uid)).toBe(uid);
      });
    });

    describe("signInWithEmail", () => {
      test("should sign in a user with valid data", async () => {
        await assertSucceeds(signInWithEmail(email, password));
      });
      test("should throw an error with a blank email", async () => {
        await expect(signInWithEmail("", password)).rejects.toThrowError(
          new DownError("email-empty")
        );
      });
      test("should throw an error with a blank password", async () => {
        await expect(signInWithEmail(email, "")).rejects.toThrowError(
          new DownError("password-empty")
        );
      });
    });

    describe("signUpWithEmail", () => {
      test("should throw an error with a blank email", async () => {
        await expect(
          signUpWithEmail("", password, password)
        ).rejects.toThrowError(new DownError("email-empty"));
      });
      test("should throw an error with a blank password1", async () => {
        await expect(signUpWithEmail(email, "", password)).rejects.toThrowError(
          new DownError("password-empty")
        );
      });
      test("should throw an error with a blank password2", async () => {
        await expect(signUpWithEmail(email, password, "")).rejects.toThrowError(
          new DownError("password-empty")
        );
      });
      test("should throw an error if passwords don't match", async () => {
        await expect(
          signUpWithEmail(email, password, password2)
        ).rejects.toThrowError(new DownError("password-mismatch"));
      });
    });

    describe("resetPassword", () => {
      test("should throw an error with a blank email", async () => {
        await expect(resetPassword(getAuth(), "")).rejects.toThrowError(
          new DownError("email-empty")
        );
      });
    });

    describe("changePassword", () => {
      test("should throw an error with a blank password1", async () => {
        await expect(
          changePassword(mockAliceUser, "", password)
        ).rejects.toThrowError(new DownError("password-empty"));
      });
      test("should throw an error with a blank password2", async () => {
        await expect(
          changePassword(mockAliceUser, password, "")
        ).rejects.toThrowError(new DownError("password-empty"));
      });
      test("should throw an error if passwords don't match", async () => {
        await expect(
          changePassword(mockAliceUser, password, password2)
        ).rejects.toThrowError(new DownError("password-mismatch"));
      });
    });

    describe("changeEmail", () => {
      let email = "new@email.com";
      let email2 = "different@email.com";
      test("should throw an error with a blank email1", async () => {
        await expect(
          changeEmail(mockAliceUser, "", email)
        ).rejects.toThrowError(new DownError("email-empty"));
      });
      test("should throw an error with a blank email2", async () => {
        await expect(
          changeEmail(mockAliceUser, email, "")
        ).rejects.toThrowError(new DownError("email-empty"));
      });
      test("should throw an error if emails don't match", async () => {
        await expect(
          changeEmail(mockAliceUser, email, email2)
        ).rejects.toThrowError(new DownError("email-mismatch"));
      });
    });
  });
});
