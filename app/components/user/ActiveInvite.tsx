import React from "react";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import {
  ActiveInviteButtonsContainer,
  ActiveInviteContainer,
  ActiveInviteContents,
  ActiveInviteGroupIcon,
  ActiveInviteGroupName,
  ActiveInviteResponseMessage,
} from "../../styles/components/user/activeInvite.styles";
import {
  InviterLabel,
  InviterLabelContainer,
  InviterLabelMessage,
} from "../../styles/components/user/userInvitesInviter.styles";
import { colors } from "../../styles/global.styles";
import { Twemoji } from "../global/Twemoji";
import { GreenAcceptButton, GreyCancelButton } from "../global/buttons";
import { db } from "../../../firebase/firebase";
import { getUserId } from "../../../firebase/firestore/auth";
import {
  InviteStatuses,
  FIRESTORE,
} from "../../../firebase/firestore/constants";
import { getGroupDocRef } from "../../../firebase/firestore/groups";
import { useGroupData } from "../../hooks/group";
import { useActiveInvite } from "../../hooks/invite";

/**
 * this is where a user can accept or ignore a pending group invite.
 *
 * @param params include:
 *
 * - `gid`: string;
 * - `username`: string;
 * - `status`: keyof InviteStatuses;
 * - `titleColor`?: string;
 *
 * @returns
 */
export function ActiveInvite({
  gid,
  username,
  status,
  titleColor,
}: {
  gid: string;
  username: string;
  status: keyof InviteStatuses;
  titleColor?: string;
}) {
  const uid = getUserId();
  const [groupData, groupDataLoading, groupDataError] = useDocumentDataOnce(
    getGroupDocRef(db, gid)
  );
  const { groupName, groupIcon } = useGroupData({ uid, groupData });
  const { accepted, ignored, handleInvite } = useActiveInvite({ uid, gid });

  return (
    <ActiveInviteContainer>
      <InviterLabelContainer>
        <InviterLabel>{username}</InviterLabel>
        <InviterLabelMessage>
          {" "}
          {status === "pending" ? "invites" : "invited"} you to
        </InviterLabelMessage>
      </InviterLabelContainer>
      <ActiveInviteContents>
        <ActiveInviteGroupName
          titleColor={
            groupDataLoading ? colors.middleGrey : titleColor ?? colors.darkGrey
          }>
          {groupDataLoading ? "..." : groupDataError ? "!?" : groupName}
        </ActiveInviteGroupName>
        <ActiveInviteGroupIcon>
          <Twemoji
            size={36}
            emoji={groupDataLoading ? "😶" : groupDataError ? "⚠" : groupIcon}
          />
        </ActiveInviteGroupIcon>
      </ActiveInviteContents>
      {accepted || status === FIRESTORE.INVITES.STATUSES.ACCEPTED ? (
        <ActiveInviteContents>
          <ActiveInviteResponseMessage titleColor={colors.green}>
            accepted! <Twemoji size={36} emoji={"👍"} />
          </ActiveInviteResponseMessage>
        </ActiveInviteContents>
      ) : ignored ? (
        <ActiveInviteContents>
          <ActiveInviteResponseMessage titleColor={colors.middleGrey}>
            ignored <Twemoji size={36} emoji={"✋"} />
          </ActiveInviteResponseMessage>
        </ActiveInviteContents>
      ) : (
        <ActiveInviteButtonsContainer>
          {status !== FIRESTORE.INVITES.STATUSES.IGNORED ? (
            <GreyCancelButton
              title='ignore'
              onPress={async () => await handleInvite("ignored")}
              size='sm'
              margin={"auto"}
              tight
            />
          ) : null}
          <GreenAcceptButton
            title='accept'
            onPress={async () => handleInvite("accepted")}
            size='sm'
            margin={"auto"}
            tight
          />
        </ActiveInviteButtonsContainer>
      )}
    </ActiveInviteContainer>
  );
}
