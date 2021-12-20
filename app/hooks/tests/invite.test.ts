/**
 * @jest-environment jsdom
 */

import { renderHook } from "@testing-library/react-hooks";
import { USERS } from "../../../firebase/firestore/tests/firebase.testconfig";
import { useActiveInvite, useGroupInvites, useInvite } from "../invite";

describe("hooks: invite.ts", () => {
  describe("useGroupInvites", () => {
    const render = () => renderHook(() => useGroupInvites());
    test("should pass", () => {
      const { result } = render();
      // TODO
    });
  });
  describe("useInvite: app", () => {
    const render = () =>
      renderHook(() => {
        useInvite({});
      });
    test("should pass", () => {
      const { result } = render();
      // TODO
    });
  });
  describe("useInvite: group", () => {
    let gid = "group123";
    let uid = USERS.ALICE.uid;
    const render = () => renderHook(() => useInvite({ gid, uid }));
    test("should pass", () => {
      const { result } = render();
      // TODO
    });
  });

  describe("useActiveInvite", () => {
    let gid = "group123";
    let uid = USERS.ALICE.uid;
    const render = () => renderHook(() => useActiveInvite({ uid, gid }));
    test("should pass", () => {
      const { result } = render();
      // TODO
    });
  });
});
