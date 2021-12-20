/**
 * @jest-environment jsdom
 */

import { act, renderHook } from "@testing-library/react-hooks";
import { VALID_GROUP_AND_USER_ICONS } from "../../../firebase/firestore/constants";
import { USERS } from "../../../firebase/firestore/tests/firebase.testconfig";
import { DownErrorMessages } from "../../../utils/errors";
import { useNameAndIcon } from "../global";

describe("hooks: global.ts", () => {
  const render = (userData?: any) => renderHook(() => useNameAndIcon(userData));
  describe("handleErrors", () => {});

  describe("useNameAndIcon", () => {
    test("should handle name errors and validation properly", async () => {
      const { result } = render();

      // assert initial state
      expect(result.current.errors.nameError).toBe("");
      expect(result.current.name).toBe("");
      expect(result.current.validateNameAndIcon).toBeDefined();

      // validate empty name and icon
      act(() => {
        result.current.validateNameAndIcon();
      });

      // assert new state - should have name error: empty
      let errorMsg = DownErrorMessages["name-empty"];
      expect(result.current.errors.nameError).toBe(errorMsg);
      expect(result.current.name).toBe("");

      // change name value to short name
      let name = "a";
      act(() => {
        result.current.setName(name);
      });

      // assert new state - errors should be cleared
      expect(result.current.errors.nameError).toBe("");
      expect(result.current.name).toBe(name);

      // validate short name and icon
      act(() => {
        result.current.validateNameAndIcon();
      });

      // assert new state - should have name error: too short
      errorMsg = DownErrorMessages["name-too-short"];
      expect(result.current.errors.nameError).toBe(errorMsg);
      expect(result.current.name).toBe(name);

      // change name value to long name and validate
      name = "alice has a really really really really long name";
      act(() => {
        result.current.setName(name);
      });
      act(() => {
        result.current.validateNameAndIcon();
      });

      // assert new state - errors should be cleared
      errorMsg = DownErrorMessages["name-too-long"];
      expect(result.current.errors.nameError).toBe(errorMsg);
      expect(result.current.name).toBe(name);

      // change name value to good value and validate
      name = "alice";
      act(() => {
        result.current.setName(name);
      });
      act(() => {
        result.current.validateNameAndIcon();
      });

      // assert new state - no errors
      expect(result.current.errors.nameError).toBe("");
      expect(result.current.name).toBe(name);
    });

    test("should handle icon errors and validation properly", async () => {
      const { result } = render();
      // arrange a good name
      act(() => {
        result.current.setName(USERS.ALICE.name);
      });

      // assert initial state
      expect(result.current.errors.iconError).toBe("");
      expect(result.current.icon).toBe("");
      expect(result.current.validateNameAndIcon).toBeDefined();

      // validate name and empty icon
      act(() => {
        result.current.validateNameAndIcon();
      });

      // assert new state - should have icon error
      let errorMsg = DownErrorMessages["icon-invalid"];
      expect(result.current.errors.iconError).toBe(errorMsg);
      expect(result.current.icon).toBe("");

      // change icon value to bad icon value
      let icon = "a";
      act(() => {
        result.current.setIcon(icon);
      });

      // assert new state - error should be cleared
      expect(result.current.errors.iconError).toBe("");
      expect(result.current.icon).toBe(icon);

      // validate name and bad icon
      act(() => {
        result.current.validateNameAndIcon();
      });

      // assert new state - should have icon error
      expect(result.current.errors.iconError).toBe(errorMsg);
      expect(result.current.icon).toBe(icon);

      // change icon value to good icon and validate
      icon = VALID_GROUP_AND_USER_ICONS[0];
      act(() => {
        result.current.setIcon(icon);
      });
      act(() => {
        result.current.validateNameAndIcon();
      });
      // assert new state - no error
      expect(result.current.errors.iconError).toBe("");
      expect(result.current.icon).toBe(icon);
    });

    test("should receive and update name and icon with existing user name and icon", () => {
      // arrange initial state
      let name = USERS.ALICE.name;
      let icon = VALID_GROUP_AND_USER_ICONS[0];

      // render initial state
      const { result } = render({ name: name, icon: icon });

      // assert initial state
      expect(result.current.errors.nameError).toBe("");
      expect(result.current.errors.iconError).toBe("");
      expect(result.current.name).toBe(name);
      expect(result.current.icon).toBe(icon);
    });
  });
});
