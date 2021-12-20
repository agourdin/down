/**
 * @jest-environment jsdom
 */

import { renderHook } from "@testing-library/react-hooks";
import { useAuthenticate } from "../auth";

describe("hooks: auth.ts", () => {
  describe("useAuthenticate", () => {
    const render = () => renderHook(() => useAuthenticate());
    test("should pass", () => {
      const { result } = render();
      // TODO
    });
  });
});
