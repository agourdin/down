import { Timestamp } from "@firebase/firestore";
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  convert24hTime,
  convertMillisToTimeAgo,
  firestoreAutoId,
  getTimeInMillis,
  nestedFieldPath,
} from "../utils";
import { TEST_ENV_OPTIONS } from "./firebase.testconfig";

let testEnv: RulesTestEnvironment;

describe("unit: utils.ts", () => {
  /*******************************************************************************************************
  
    setup
  
  *******************************************************************************************************/

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment(TEST_ENV_OPTIONS);
    return;
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  afterAll(async () => {
    await testEnv.cleanup();
    return;
  });

  /*******************************************************************************************************
  
    tests
  
  *******************************************************************************************************/

  describe("firestoreAutoId", () => {
    test("should return a valid auotId", () => {
      const autoId = firestoreAutoId();
      expect(autoId.length === 20 && typeof autoId === "string").toBe(true);
    });
  });

  describe("convert24hTime", () => {
    test("should convert 0 to 12", () => {
      expect(convert24hTime("0")).toBe("12");
    });
    test("should convert 24 to 12", () => {
      expect(convert24hTime("24")).toBe("12");
    });
    test("should convert 5 to 5", () => {
      expect(convert24hTime("5")).toBe("5");
    });
    test("should convert 13 to 1", () => {
      expect(convert24hTime("13")).toBe("1");
    });
    test("should convert 23 to 11", () => {
      expect(convert24hTime("23")).toBe("11");
    });
  });

  describe("convertMillisToTimeAgo", () => {
    test("should convert 12 to 12s ago", () => {
      expect(convertMillisToTimeAgo(12)).toBe("now");
    });
    test("should convert 122 to now", () => {
      expect(convertMillisToTimeAgo(122)).toBe("now");
    });
    test("should convert 1222 to 1s ago", () => {
      expect(convertMillisToTimeAgo(1222)).toBe("1s ago");
    });
    test("should convert 12222 to 12s ago", () => {
      expect(convertMillisToTimeAgo(12222)).toBe("12s ago");
    });
    test("should convert 122222 to 2m ago", () => {
      expect(convertMillisToTimeAgo(122222)).toBe("2m ago");
    });
    test("should convert 1222222 to 20m ago", () => {
      expect(convertMillisToTimeAgo(1222222)).toBe("20m ago");
    });
    test("should convert 12222222 to 3h ago", () => {
      expect(convertMillisToTimeAgo(12222222)).toBe("3h ago");
    });
    test("should convert 122222222 to 1d ago", () => {
      expect(convertMillisToTimeAgo(122222222)).toBe("1d ago");
    });
    test("should throw error if given a negative value", () => {
      expect(() => convertMillisToTimeAgo(-10)).toThrow();
    });
  });

  describe("getTimeInMillis", () => {
    test("should return the getTime() string for a given timestamp", () => {
      let now = Timestamp.now();
      expect(getTimeInMillis(now)).toBe(now.toDate().getTime());
    });
  });

  describe("nestedFieldPath", () => {
    test("should convert ['path','to','field'] to 'path.to.field'", () => {
      expect(nestedFieldPath(["path", "to", "field"])).toBe("path.to.field");
    });
  });
});
