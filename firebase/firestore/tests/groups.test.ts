import { getDoc, setDoc } from "@firebase/firestore";
import {
  assertFails,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { FIRESTORE } from "../constants";
import { TEST_ENV_OPTIONS, USERS, testdb } from "./firebase.testconfig";
import {
  addMessageToChat,
  getGroupDocRef,
  Group,
  handleExitGroup,
  handleGroupMembershipUpdate,
  makeMemberDownPath,
  Message,
  NewGroup,
  newMember,
  newMessage,
  setGroupDoc,
  toggleDownSilently,
  updateMember,
  updateSeenBy,
} from "../groups";
import { createGroupInviteDoc, newGroupInvite } from "../invites";
import { getPrivateDataDocRef, getUserDocRef } from "../users";
import { ALICE_PRIVATE_DATA, ALICE_USER_DATA } from "./users.test";
import { Timestamp } from "firebase/firestore";

let testEnv: RulesTestEnvironment;
let db: any;

export const ALICE_GROUP_ID = "alice123";
export const ALICE_GROUP_DATA: NewGroup = {
  name: "alice's group",
  icon: "🙂",
  members: {
    [USERS.ALICE.uid]: {
      name: USERS.ALICE.name,
      icon: USERS.ALICE.icon,
      down: true,
      expoPushToken: USERS.ALICE.expoPushToken,
    },
  },
};

export const ALICE_AND_BOB_GROUP_ID = "aliceAndBob123";
export const ALICE_AND_BOB_GROUP_DATA: Group = {
  name: "alice & bob's group",
  icon: "🙂",
  members: {
    [USERS.ALICE.uid]: {
      name: USERS.ALICE.name,
      icon: USERS.ALICE.icon,
      down: true,
      expoPushToken: USERS.ALICE.expoPushToken,
    },
    [USERS.BOB.uid]: {
      name: USERS.BOB.name,
      icon: USERS.BOB.icon,
      down: false,
      expoPushToken: USERS.BOB.expoPushToken,
    },
  },
  chat: {
    lastMessage: {
      content: {
        uid: USERS.ALICE.uid,
        timestamp: Timestamp.now(),
        text: "hello from alice!",
      },
      seenBy: [USERS.ALICE.uid],
    },
    messages: [],
  },
};

export const ZOE_GROUP_ID = "zoe123";
export const ZOE_GROUP_DATA = {
  name: "zoe's group",
  icon: "🙂",
  members: {
    [USERS.ZOE.uid]: {
      name: USERS.ZOE.name,
      icon: USERS.ZOE.icon,
      down: false,
      expoPushToken: USERS.ZOE.expoPushToken,
    },
  },
};

describe("tests: groups.ts", () => {
  /*******************************************************************************************************
  
    setup
  
  *******************************************************************************************************/

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment(TEST_ENV_OPTIONS);
    return;
  });
  beforeEach(async () => {
    await testEnv.clearFirestore();
    return await testEnv.withSecurityRulesDisabled(async (context) => {
      db = context.firestore();
      // set up alice's group
      await setGroupDoc(db, ALICE_GROUP_ID, ALICE_GROUP_DATA);
      // set up alice and bob's group
      await setGroupDoc(db, ALICE_AND_BOB_GROUP_ID, ALICE_AND_BOB_GROUP_DATA);
      // set up zoe's group
      await setGroupDoc(db, ZOE_GROUP_ID, ZOE_GROUP_DATA);
      // set up alice's user doc
      await setDoc(getUserDocRef(db, USERS.ALICE.uid), ALICE_USER_DATA);
      // create an invite from zoe to alice to join zoe's group
      let newGroupInviteData = newGroupInvite(USERS.ZOE.uid);
      await createGroupInviteDoc(
        db,
        USERS.ALICE.email,
        ZOE_GROUP_ID,
        newGroupInviteData
      );
      db = testdb(USERS.ALICE, testEnv);
      return;
    });
  });
  afterAll(async () => {
    await testEnv.cleanup();
    return;
  });

  describe("unit:", () => {
    /*******************************************************************************************************
    
      data defs
    
    *******************************************************************************************************/

    let uid = USERS.ALICE.uid;
    let gid = ZOE_GROUP_ID;
    let expectedGroupData: Group | any = ZOE_GROUP_DATA ?? {};

    let expectedText: Message["text"] = "hello!";

    describe("group functions | groups/{gid}", () => {
      /*******************************************************************************************************
  
        group functions | groups/{gid}
  
      *******************************************************************************************************/
      describe("members field functions | groups/{gid}.members", () => {
        /*******************************************************************************************************
        
        members field functions | groups/{gid}.members
        
        *******************************************************************************************************/

        describe("updateMember", () => {
          describe("join", () => {
            test("should add uid as a key to members map with default new member data (down: false)", async () => {
              await testEnv.withSecurityRulesDisabled(async (context) => {
                let db = context.firestore();
                await updateMember(db, uid, gid, "join");
                const newGroupDocData = (
                  await getDoc(getGroupDocRef(db, gid))
                ).data();
                expect(newGroupDocData?.members).toHaveProperty(uid);
              });
            });
          });
          describe("exit", () => {
            test("should delete a uid from members map", async () => {
              await testEnv.withSecurityRulesDisabled(async (context) => {
                let db = context.firestore();
                let gid = ALICE_AND_BOB_GROUP_ID;
                await updateMember(db, uid, gid, "exit");
                const newGroupDocData = (
                  await getDoc(getGroupDocRef(db, gid))
                ).data();
                expect(newGroupDocData?.members).not.toHaveProperty(uid);
              });
            });
          });
          describe("update", () => {
            let gid = ALICE_AND_BOB_GROUP_ID;
            test("should throw error if no data is given", async () => {
              await testEnv.withSecurityRulesDisabled(async (context) => {
                let db = context.firestore();
                expect(updateMember(db, uid, gid, "update")).rejects.toThrow();
              });
            });
            test("should update the data at the given uid in the members map", async () => {
              await testEnv.withSecurityRulesDisabled(async (context) => {
                let db = context.firestore();
                let down = false;
                await updateMember(db, uid, gid, "update", {
                  [makeMemberDownPath(uid)]: down,
                });
                // await updateMember(db, uid, gid, "update", newMemberDown(down));
                let newGroupDocData = (
                  await getDoc(getGroupDocRef(db, gid))
                ).data();
                expect(newGroupDocData?.members[uid].down).toBe(down);
              });
            });
          });
        });

        describe("toggleDown", () => {
          let gid = ALICE_AND_BOB_GROUP_ID;
          test("should toggle a uid's down status in a members map between false and true", async () => {
            await testEnv.withSecurityRulesDisabled(async (context) => {
              let db = context.firestore();
              await toggleDownSilently(db, uid, gid, true);
              let newGroupDoc = await getDoc(getGroupDocRef(db, gid));
              expect(newGroupDoc.data()?.members[uid].down).toBe(false);
              await toggleDownSilently(db, uid, gid, false);
              newGroupDoc = await getDoc(getGroupDocRef(db, gid));
              expect(newGroupDoc.data()?.members[uid].down).toBe(true);
            });
          });
        });
      });

      describe("chat field functions | groups/{gid}.chat", () => {
        /*******************************************************************************************************
       
         chat field functions | groups/{gid}.chat
       
       *******************************************************************************************************/

        describe("newChatMessage", () => {
          test("should construct a proper chat message object", () => {
            let newChat = newMessage(uid, expectedText);
            expect(newChat).toHaveProperty("timestamp");
            expect(newChat).toHaveProperty("uid");
            expect(newChat.uid).toBe(uid);
            expect(newChat).toHaveProperty("text");
            expect(newChat.text).toBe(expectedText);
          });
        });

        describe("addMessageToChat", () => {
          test("should properly add a new message to the chat map of a group doc", async () => {
            await testEnv.withSecurityRulesDisabled(async (context) => {
              let db = context.firestore();
              const expectedChat = await addMessageToChat(
                db,
                gid,
                uid,
                expectedText
              );
              let data = (await getDoc(getGroupDocRef(db, gid))).data();
              let chat = data?.chat;
              expect(data).toHaveProperty(FIRESTORE.PATHS.CHAT);
              expect(chat.lastMessage.content).toMatchObject(
                expectedChat.lastMessage.content
              );
            });
          });
        });

        describe("updateSeenBy", () => {
          test("should properly add a uid to the seenBy list", async () => {
            await testEnv.withSecurityRulesDisabled(async (context) => {
              let db = context.firestore();
              await addMessageToChat(db, gid, uid, expectedText);
              let newUid = USERS.BOB.uid;
              await updateSeenBy(db, gid, newUid);
              let newGroupDoc = await getDoc(getGroupDocRef(db, gid));
              let data = newGroupDoc.data();
              let chat = data?.chat;
              let expectedSeenBy = [uid, newUid];
              expect(chat.lastMessage.seenBy).toMatchObject(expectedSeenBy);
            });
          });
        });
      });
    });

    describe("handlers", () => {
      /*******************************************************************************************************
      
        handlers
      
      *******************************************************************************************************/
      let uid = USERS.ALICE.uid;

      describe("handleGroupMembershipUpdate", () => {
        let gid = ALICE_AND_BOB_GROUP_ID;
        test("should successfully join a user to a group", async () => {
          await testEnv.withSecurityRulesDisabled(async (context) => {
            let db = context.firestore();
            // set up alice's private data doc with alice and bob's group id in it
            await setDoc(getPrivateDataDocRef(db, USERS.ALICE.uid), {
              groups: ["aDifferentGroup123"],
              expoPushToken: "expotoken123",
            });
            await handleGroupMembershipUpdate(db, uid, gid, "join");
            let privateDataDoc = await getDoc(getPrivateDataDocRef(db, uid));
            let newGroupDoc = await getDoc(getGroupDocRef(db, gid));
            expect(newGroupDoc.data()?.members[uid]).toMatchObject(newMember());
            expect(
              privateDataDoc.data()?.groups.indexOf(gid)
            ).toBeGreaterThanOrEqual(0);
            expect(
              privateDataDoc.data()?.groups.indexOf("aDifferentGroup123")
            ).toBeGreaterThanOrEqual(0);
          });
        });
        test("should successfully exit a user from a group", async () => {
          await testEnv.withSecurityRulesDisabled(async (context) => {
            let db = context.firestore();
            // set up alice's private data doc with alice and bob's group id in it
            await setDoc(getPrivateDataDocRef(db, USERS.ALICE.uid), {
              groups: ["aDifferentGroup123"],
              expoPushToken: "expotoken123",
            });
            await handleGroupMembershipUpdate(db, uid, gid, "exit");
            let privateDataDoc = await getDoc(getPrivateDataDocRef(db, uid));
            let newGroupDoc = await getDoc(getGroupDocRef(db, gid));
            expect(newGroupDoc.data()?.members).not.toHaveProperty(uid);
            expect(privateDataDoc.data()?.groups.indexOf(gid)).toBe(-1);
            expect(
              privateDataDoc.data()?.groups.indexOf("aDifferentGroup123")
            ).toBeGreaterThanOrEqual(0);
          });
        });
      });
      describe("handleExitGroup", () => {
        let gid = ALICE_AND_BOB_GROUP_ID;
        test("should successfully exit a user from a group", async () => {
          await testEnv.withSecurityRulesDisabled(async (context) => {
            let db = context.firestore();
            // set up alice's private data doc with alice and bob's group id in it
            await setDoc(getPrivateDataDocRef(db, USERS.ALICE.uid), {
              groups: ["aDifferentGroup123"],
              expoPushToken: "expotoken123",
            });
            await handleExitGroup(db, uid, gid);
            let privateDataDoc = await getDoc(getPrivateDataDocRef(db, uid));
            let newGroupDoc = await getDoc(getGroupDocRef(db, gid));
            expect(newGroupDoc.data()?.members).not.toHaveProperty(uid);
            expect(privateDataDoc.data()?.groups.indexOf(gid)).toBe(-1);
            expect(
              privateDataDoc.data()?.groups.indexOf("aDifferentGroup123")
            ).toBeGreaterThanOrEqual(0);
          });
        });
        test("should not remove a user if their uid is not in the group's members map", async () => {
          let gid = "differentGroup";
          await assertFails(handleExitGroup(db, uid, gid));
        });
      });
    });
  });
});
