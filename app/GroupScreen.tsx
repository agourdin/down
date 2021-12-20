import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { RootStackParamList } from "../App";
import { db } from "../firebase/firebase";
import { getGroupDocRef, toggleDown } from "../firebase/firestore/groups";
import { LinearGradientBackground } from "./components/global/backgrounds";
import { GroupBottomBar } from "./components/group/GroupBottomBar";
import { GroupHomeTopBar } from "./components/group/GroupHomeTopBar";
import { GroupMemberList } from "./components/group/GroupMemberList";
import { GroupTopBar } from "./components/group/GroupTopBar";
import { useGroupData, useUpdateSelfMemberData } from "./hooks/group";
import { FieldLabel } from "./styles/components/global/text.styles";
import { colors } from "./styles/global.styles";
import { GroupContainer } from "./styles/screens/group/groupHomeScreen.styles";
import { GroupScreenContainer } from "./styles/screens/screen.styles";

/**
 * @remarks
 * group home screen
 *
 * @description
 * this is where the user can:
 * - view a group's members and their current down statuses.
 * - change their own down status.
 * - get to a group's chat.
 * - get to a group's settings.
 *
 * user can navigate from here to:
 * - group chat (group/GroupChatModal) -> by tapping on the chat button in bottom left.
 * - user settings modal (user/UserSettingsScreen) -> by tapping user icon in bottom right.
 * - group settings modal (group/GroupSettingsScreen) -> by tapping user icon in upper right.
 * - invite to group screen (group/InviteToGroupScreen) -> by tapping the invite button in upper left.
 * - user home screen (user/UserHomeScreen) -> by swiping back.
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the group home screen.
 */
export function GroupHomeScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "GroupHome">): JSX.Element {
  // route params
  const { gid, uid } = route.params;

  // hooks
  const [groupData, groupDataLoading, groupDataError] = useDocumentData(
    getGroupDocRef(db, gid)
  );
  const { groupName, groupIcon, members, self, unseenMessages } = useGroupData({
    uid,
    groupData,
  });
  useUpdateSelfMemberData({ uid, gid, self });

  const downColors = [colors.green, colors.blue];
  const notDownColors = [colors.red, colors.yellow];

  return (
    <LinearGradientBackground
      colors={
        groupDataLoading
          ? [colors.lightGrey, colors.middleGrey]
          : self.down
          ? downColors
          : notDownColors
      }>
      <GroupScreenContainer>
        <GroupHomeTopBar uid={uid} navigation={navigation} />
        <GroupContainer>
          {groupDataLoading ? (
            <FieldLabel>loading...</FieldLabel>
          ) : groupDataError ? (
            <FieldLabel>
              ack! something went wrong. please try again later...
            </FieldLabel>
          ) : (
            <>
              {/* TOP BAR */}
              <GroupTopBar
                uid={uid}
                gid={gid}
                groupName={groupName}
                groupIcon={groupIcon}
                navigation={navigation}
              />
              {/* MEMBER LIST */}
              <GroupMemberList
                gid={gid}
                members={members}
                groupName={groupName}
              />
              {/* BOTTOM BAR */}
              <GroupBottomBar
                navigation={navigation}
                gid={gid}
                uid={uid}
                self={self}
                unseenMessages={unseenMessages}
                toggleDown={async () => {
                  await toggleDown(
                    db,
                    uid,
                    gid,
                    self.down,
                    self.name,
                    groupName,
                    members
                  );
                }}
              />
            </>
          )}
        </GroupContainer>
      </GroupScreenContainer>
    </LinearGradientBackground>
  );
}
