/**
 * @jest-environment jsdom
 */

import { renderHook } from "@testing-library/react-hooks";
import { USERS } from "../../../firebase/firestore/tests/firebase.testconfig";
import { ALICE_AND_BOB_GROUP_DATA } from "../../../firebase/firestore/tests/groups.test";
import {
  useChat,
  useEditGroup,
  useGroupData,
  useUpdateSelfMemberData,
} from "../group";

describe("hooks: group.ts", () => {
  describe("useGroupData", () => {
    let uid = USERS.ALICE.uid;
    let groupData = ALICE_AND_BOB_GROUP_DATA;
    const render = () => renderHook(() => useGroupData({ uid, groupData }));
    test("should pass", () => {
      const { result } = render();
      // TODO
    });
  });
  describe("useEditGroup", () => {
    let gid = "group123";
    const render = () => renderHook(() => useEditGroup(gid));
    test("should pass", () => {
      const { result } = render();
      // TODO
    });
  });
  describe("useUpdateSelfMemberData", () => {
    let uid = USERS.ALICE.uid;
    let gid = "group123";
    let self = ALICE_AND_BOB_GROUP_DATA.members[uid];
    const render = () =>
      renderHook(() => useUpdateSelfMemberData({ uid, gid, self }));
    test("should pass", () => {
      const { result } = render();
      // TODO
    });
  });
  describe("useChat", () => {
    let uid = USERS.ALICE.uid;
    let gid = "group123";
    let name = USERS.ALICE.name;
    let members = ALICE_AND_BOB_GROUP_DATA.members;
    let groupName = ALICE_AND_BOB_GROUP_DATA.name;
    const render = () =>
      renderHook(() => useChat({ uid, gid, name, members, groupName }));
    test("should pass", () => {
      const { result } = render();
      // TODO
    });
  });
});
