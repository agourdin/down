import { getDoc } from "@firebase/firestore";
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { FIRESTORE, InviteStatuses } from "../constants";
import {
  createGroupInviteDoc,
  getGroupInviteDocRef,
  getInviteDocRef,
  GroupInvite,
  Invite,
  NewGroupInvite,
  newGroupInvite,
  setInviteDoc,
  updateGroupInviteDoc,
} from "../invites";
import { TEST_ENV_OPTIONS, USERS, testdb } from "./firebase.testconfig";
let testEnv: RulesTestEnvironment;
let db: any;

describe("unit:", () => {
  /*******************************************************************************************************
  
    data defs
  
  *******************************************************************************************************/

  let uid = USERS.ALICE.uid;
  let gid = "groupId123";
  let email = USERS.CHARLIE.email;

  let expectedInviteData: Invite = {};

  let expectedNewGroupInviteData: NewGroupInvite = {
    invitedBy: uid,
    status: FIRESTORE.INVITES.STATUSES.PENDING,
  };

  let groupInvite: GroupInvite;

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

  describe("invite doc-level functions", () => {
    /*******************************************************************************************************
      
      invite doc-level functions
    
    *******************************************************************************************************/
    describe("setInviteDoc", () => {
      test("should create an invite document at /invites/{email} if none exists", async () => {
        await setInviteDoc(db, email);
        expect((await getDoc(getInviteDocRef(db, email))).data()).toMatchObject(
          expectedInviteData
        );
      });
      test("should return true if a document at /invites/{email} already exists", async () => {
        await setInviteDoc(db, email);
        const result = await setInviteDoc(db, email);
        expect(result).toBe(true);
      });
    });
  });

  describe("group invite doc-level functions", () => {
    /*******************************************************************************************************
      
      group invite doc-level functions
    
    *******************************************************************************************************/
    describe("newGroupInvite", () => {
      test("should create a proper group invite object", () => {
        groupInvite = newGroupInvite(uid);
        expect(groupInvite).toMatchObject(expectedNewGroupInviteData);
      });
    });

    describe("createGroupInviteDoc", () => {
      test("should create an invite doc at invites/{email} if none exists", async () => {
        await testEnv.withSecurityRulesDisabled(async (context) => {
          let db = context.firestore();
          let email = "totallynew@email.com";
          let data = groupInvite;
          await createGroupInviteDoc(db, email, gid, data);
          const newInviteDoc = getDoc(getInviteDocRef(db, email));
          expect((await newInviteDoc).exists()).toBe(true);
        });
      });
      test("should create a group invite doc at invites/{email/groups{gid} if none exists", async () => {
        await testEnv.withSecurityRulesDisabled(async (context) => {
          let db = context.firestore();
          let data = groupInvite;
          await createGroupInviteDoc(db, email, gid, data);
          const newGroupInviteDoc = await getDoc(
            getGroupInviteDocRef(db, email, gid)
          );
          expect(newGroupInviteDoc.data()).toMatchObject(
            expectedNewGroupInviteData
          );
        });
      });
      test("should return true if a group invite doc at invites/{email/groups{gid} already exists", async () => {
        await testEnv.withSecurityRulesDisabled(async (context) => {
          let db = context.firestore();
          let data = groupInvite;
          await createGroupInviteDoc(db, email, gid, data);
          const result = await createGroupInviteDoc(db, email, gid, data);
          expect(result).toBe(true);
        });
      });
    });

    describe("updateGroupInviteDoc", () => {
      let statuses: { [key: string]: string } = FIRESTORE.INVITES.STATUSES;
      Object.keys(FIRESTORE.INVITES.STATUSES).forEach((key: string) => {
        let status: keyof InviteStatuses | string = statuses[key];
        test(
          "should update the status of a group invite with status: " + status,
          async () => {
            await testEnv.withSecurityRulesDisabled(async (context) => {
              let db = context.firestore();
              let data = groupInvite;
              await createGroupInviteDoc(db, email, gid, data);
              await updateGroupInviteDoc(db, email, gid, status);
            });
          }
        );
      });
    });
  });
});
