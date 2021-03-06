/**
 * @jest-environment jsdom
 */

import { renderHook } from "@testing-library/react-hooks";
import { USERS } from "../../../firebase/firestore/tests/firebase.testconfig";
import { useUser } from "../user";

describe("hooks: user.ts", () => {
  const render = () => renderHook(() => useUser(USERS.ALICE.uid));

  describe("useUser", () => {
    test("should pass", () => {
      const { result } = render();
      // TODO
    });
  });
});
