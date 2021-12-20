import * as React from "react";
import { db } from "../../../firebase/firebase";
import { getUserId } from "../../../firebase/firestore/auth";
import { Members, toggleDown } from "../../../firebase/firestore/groups";
import {
  GroupMemberContainer,
  GroupMemberContents,
  GroupMemberIconContainer,
  GroupMemberIconContents,
  GroupMemberName,
  GroupMemberNameContainer,
  GroupMemberStatusContainer,
  GroupMemberStatusContents,
} from "../../styles/components/group/groupMemberList.styles";
import DownStatus from "../global/DownStatus";
import { Twemoji } from "../global/Twemoji";

export function GroupMember({
  down,
  uid,
  name,
  icon,
  gid,
  groupName,
  members,
}: {
  down: boolean | undefined;
  uid: string;
  name: string;
  icon: string;
  gid: string;
  groupName: string;
  members: Members;
}): JSX.Element {
  const memberIsUser = uid === getUserId();
  const handleDownToggle = async () => {
    if (!memberIsUser) return;
    await toggleDown(db, uid, gid, Boolean(down), name, groupName, members);
  };
  return (
    <GroupMemberContainer>
      <GroupMemberContents>
        <GroupMemberStatusContainer>
          <GroupMemberStatusContents
            disabled={!memberIsUser}
            onPress={handleDownToggle}>
            <DownStatus down={down} size='sm' />
          </GroupMemberStatusContents>
        </GroupMemberStatusContainer>
        <GroupMemberNameContainer>
          <GroupMemberName down={down}>{name}</GroupMemberName>
        </GroupMemberNameContainer>
        <GroupMemberIconContainer>
          <GroupMemberIconContents>
            <Twemoji size={36} emoji={icon} />
          </GroupMemberIconContents>
        </GroupMemberIconContainer>
      </GroupMemberContents>
    </GroupMemberContainer>
  );
}
