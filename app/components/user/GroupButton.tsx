import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { FieldLabel } from "../../styles/components/global/text.styles";
import {
  GroupButtonContainer,
  GroupButtonContents,
  GroupButtonIcon,
  GroupButtonItemContainer,
  GroupButtonText,
  GroupButtonTextContainer,
} from "../../styles/components/user/groupButton.styles";
import { colors } from "../../styles/global.styles";
import { Twemoji } from "../global/Twemoji";
import DownStatus from "../global/DownStatus";
import { db } from "../../../firebase/firebase";
import { getGroupDocRef, toggleDown } from "../../../firebase/firestore/groups";
import { useGroupData } from "../../hooks/group";

export function GroupButton({
  uid,
  gid,
  onPress,
  titleColor,
}: {
  uid: string;
  gid: string;
  onPress: () => any;
  titleColor?: string;
}) {
  const [groupData, groupDataLoading, groupDataError] = useDocumentData(
    getGroupDocRef(db, gid)
  );

  const { groupName, groupIcon, members, self, unseenMessages } = useGroupData({
    uid,
    groupData,
  });

  return (
    <GroupButtonContainer>
      <GroupButtonContents>
        {groupDataLoading ? (
          <FieldLabel>loading...</FieldLabel>
        ) : (
          <>
            <GroupButtonItemContainer
              onPress={async () =>
                await toggleDown(
                  db,
                  uid,
                  gid,
                  Boolean(self.down),
                  self.name,
                  groupName,
                  members
                )
              }>
              <DownStatus
                down={self.down}
                loading={groupDataLoading}
                error={Boolean(groupDataError)}
              />
            </GroupButtonItemContainer>
            <GroupButtonTextContainer onPress={onPress}>
              <GroupButtonText
                titleColor={
                  groupDataLoading
                    ? colors.middleGrey
                    : titleColor ?? colors.darkGrey
                }>
                {groupDataLoading ? "..." : groupDataError ? "!?" : groupName}
              </GroupButtonText>
            </GroupButtonTextContainer>
            <GroupButtonItemContainer onPress={onPress}>
              <GroupButtonIcon>
                <Twemoji
                  notifications={unseenMessages}
                  size={36}
                  emoji={
                    groupDataLoading ? "😶" : groupDataError ? "⚠" : groupIcon
                  }
                />
              </GroupButtonIcon>
            </GroupButtonItemContainer>
          </>
        )}
      </GroupButtonContents>
    </GroupButtonContainer>
  );
}
