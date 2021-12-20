import { RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { Timestamp } from "firebase/firestore";
var fs = require("fs");

export const TEST_ENV_OPTIONS = {
  projectId: "down-test",
  firestore: {
    rules: fs.readFileSync("firebase/firestore.rules", "utf8"),
    host: "localhost",
    port: "8080",
  },
};

/**
 * creates a firestore db for testing.
 *
 * @param uid a test user for authentication context.
 * @param testEnv a RulesTestEnvironment.
 * @returns an initialized firestore() instance for testEnv.
 */
export const testdb = (user: TEST_USER, testEnv: RulesTestEnvironment) => {
  return testEnv
    .authenticatedContext(user.uid, { email: user.email })
    .firestore();
};

export type TEST_USER = {
  uid: string;
  email: string;
  name: string;
};

export const USERS = {
  ALICE: {
    uid: "user001",
    email: "alice@email.com",
    password: "alicehasaverysecurepassword123",
    name: "alice",
    icon: "🙂",
    expoPushToken: "ExponentPushToken[alice1234567890abc]",
  },
  BOB: {
    uid: "user002",
    email: "bob@email.com",
    name: "bob",
    icon: "🙂",
    expoPushToken: "ExponentPushToken[bob1234567890abc]",
  },
  ZOE: {
    uid: "user003",
    email: "zoe@email.com",
    name: "zoe",
    icon: "🙂",
    expoPushToken: "ExponentPushToken[zoe1234567890abc]",
  },
  CHARLIE: {
    uid: "user004",
    email: "charlie@email.com",
    name: "charlie",
    icon: "🙂",
    expoPushToken: "ExponentPushToken[charlie1234567890abc]",
  },
};

export const NOT_A_STRING = [
  ["item"],
  { key: "value" },
  10,
  true,
  Timestamp.now(),
];
export const NOT_A_LIST = [
  "string",
  { key: "value" },
  10,
  true,
  Timestamp.now(),
];
export const NOT_A_TIMESTAMP = ["string", ["item"], { key: "value" }, 10, true];

// yuck, sorry
export const NO_NO_WORDS_LIST = [
  "cunt",
  "kike",
  "faggot",
  "homo",
  "nigger",
  "pussy",
  "slut",
  "twat",
];
