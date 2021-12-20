import * as React from "react";
import { Member, Members } from "../../../firebase/firestore/groups";
import {
  GroupMemberListContainer,
  GroupMemberListContents,
} from "../../styles/components/group/groupMemberList.styles";
import { GroupMember } from "./GroupMember";

export function GroupMemberList({
  gid,
  members,
  groupName,
}: {
  gid: string;
  members: Members | undefined;
  groupName: string;
}): JSX.Element {
  // create member list
  let memberList: JSX.Element[] = [];
  if (members) {
    memberList = Object.getOwnPropertyNames(members)
      .sort((a, b) => {
        let memberA = !members[a].down ? 1 : 0;
        let memberB = !members[b].down ? 1 : 0;
        return memberA - memberB;
      })
      .map((uid: string) => {
        let member: Member = members[uid];
        let name = members[uid].name ?? "unnamed";
        let icon = members[uid].icon ?? "😶";
        return (
          <GroupMember
            key={uid}
            down={member.down}
            uid={uid}
            name={name}
            icon={icon}
            gid={gid}
            members={members}
            groupName={groupName}
          />
        );
      });
  }

  return (
    <GroupMemberListContainer>
      <GroupMemberListContents contentContainerStyle={{ alignItems: "center" }}>
        {memberList}
      </GroupMemberListContents>
    </GroupMemberListContainer>
  );
}
