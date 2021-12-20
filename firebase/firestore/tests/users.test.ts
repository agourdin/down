import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { getDoc, setDoc } from "firebase/firestore";
import { TEST_ENV_OPTIONS, USERS, testdb } from "./firebase.testconfig";
import {
  DownUser,
  getPrivateDataDocRef,
  PrivateData,
  updateExpoPushToken,
  updatePrivateGroups,
} from "../users";
import { ALICE_AND_BOB_GROUP_ID } from "./groups.test";
let testEnv: RulesTestEnvironment;
let db: any;

export const ALICE_USER_DATA: DownUser = {
  name: USERS.ALICE.name,
  icon: "🙂",
};

export const ALICE_PRIVATE_DATA: PrivateData = {
  groups: [ALICE_AND_BOB_GROUP_ID],
  expoPushToken: USERS.ALICE.expoPushToken,
};

describe("unit:", () => {
  /*******************************************************************************************************
  
    data defs
  
  *******************************************************************************************************/

  let uid = USERS.ALICE.uid;
  let gid = "groupId123";

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

  describe("user doc functions | users/{uid}", () => {
    /*******************************************************************************************************
    
      user doc functions | users/{uid}
    
    *******************************************************************************************************/

    describe("private data doc functions | users/{uid}/private/data", () => {
      /*******************************************************************************************************
      
        private data doc functions | users/{uid}/private/data
      
      *******************************************************************************************************/

      describe("groups field | users/{uid}/private/data.groups", () => {
        /*******************************************************************************************************
        
          groups field | users/{uid}/private/data.groups
        
        *******************************************************************************************************/

        describe("updatePrivateGroups", () => {
          describe("should properly update the private groups list", () => {
            test("join", async () => {
              await testEnv.withSecurityRulesDisabled(async (context) => {
                let db = context.firestore();
                await setDoc(getPrivateDataDocRef(db, uid), { groups: [] });
                await updatePrivateGroups(db, uid, gid, "join");
                const updatedPrivateData = (
                  await getDoc(getPrivateDataDocRef(db, uid))
                ).data();
                let expectedNewGroups = [gid];
                expect(updatedPrivateData?.groups).toMatchObject(
                  expectedNewGroups
                );
              });
            });

            test("exit", async () => {
              await testEnv.withSecurityRulesDisabled(async (context) => {
                let db = context.firestore();
                await setDoc(getPrivateDataDocRef(db, uid), {
                  groups: ["group123"],
                });
                await updatePrivateGroups(db, uid, "group456", "join");
                await updatePrivateGroups(db, uid, "group123", "exit");
                const updatedPrivateData = (
                  await getDoc(getPrivateDataDocRef(db, uid))
                ).data();
                let expectedNewGroups: any = ["group456"];
                expect(updatedPrivateData?.groups).toMatchObject(
                  expectedNewGroups
                );
              });
            });
          });
        });
      });

      describe("expoPushToken field | users/{uid}/private/data.expoPushToken", () => {
        /*******************************************************************************************************
        
          expoPushToken field | users/{uid}/private/data.expoPushToken
        
        *******************************************************************************************************/

        let token = "ExponentPushToken[xxxxxxxxxxxxxxx]";

        describe("updateExpoPushToken", () => {
          test("should properly update a user's push token", async () => {
            await testEnv.withSecurityRulesDisabled(async (context) => {
              let db = context.firestore();
              // add a group
              await setDoc(getPrivateDataDocRef(db, uid), {
                groups: ["group123"],
              });
              await updateExpoPushToken(db, uid, token);
              const updatedPrivateData = (
                await getDoc(getPrivateDataDocRef(db, uid))
              ).data();
              // assert token is updated properly
              expect(updatedPrivateData?.expoPushToken).toBe(token);
              // assert groups is unchanged
              expect(updatedPrivateData?.groups).toMatchObject(["group123"]);
            });
          });
        });
      });
    });
  });
});
