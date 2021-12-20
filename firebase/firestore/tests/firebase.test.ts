import { mockAliceAuth, mockAliceUser } from "./firebase.mock";
import { USERS } from "./firebase.testconfig";

describe("unit: firebase.ts", () => {
  describe("mockAliceUser", () => {
    test("should have alice's uid", async () => {
      expect(mockAliceUser.uid).toBe(USERS.ALICE.uid);
    });
    test("should have alice's email", async () => {
      expect(mockAliceUser.email).toBe(USERS.ALICE.email);
    });
  });

  describe("mockAliceAuth", () => {
    test("should include the mockAliceUser object", async () => {
      expect(mockAliceAuth.currentUser).toBe(mockAliceUser);
    });
  });
});
