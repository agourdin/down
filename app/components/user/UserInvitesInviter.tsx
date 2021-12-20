import * as React from "react";
import { InviteStatuses } from "../../../firebase/firestore/constants";
import { useUser } from "../../hooks/user";
import {
  InviterContainer,
  InviterContents,
} from "../../styles/components/user/userInvitesInviter.styles";
import { ActiveInvite } from "./ActiveInvite";

export function UserInvitesInviter({
  inviterId,
  groupId,
  status,
}: {
  inviterId: string;
  groupId: string;
  status: keyof InviteStatuses;
}): JSX.Element {
  const { name } = useUser(inviterId);
  return (
    <InviterContainer>
      <InviterContents>
        <ActiveInvite
          key={groupId}
          gid={groupId}
          username={name}
          status={status}
        />
      </InviterContents>
    </InviterContainer>
  );
}
