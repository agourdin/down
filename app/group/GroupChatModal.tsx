import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { RootStackParamList } from "../../App";
import { db } from "../../firebase/firebase";
import { getGroupDocRef } from "../../firebase/firestore/groups";
import { LinearGradientBackground } from "../components/global/backgrounds";
import { GroupChatBottomBar } from "../components/group/GroupChatBottomBar";
import { GroupChatTopBar } from "../components/group/GroupChatTopBar";
import { GroupChatWindow } from "../components/group/GroupChatWindow";
import { useGroupData, useUpdateSelfMemberData, useChat } from "../hooks/group";
import { FieldLabel } from "../styles/components/global/text.styles";
import { colors } from "../styles/global.styles";
import { GroupChatContainer } from "../styles/screens/group/groupChatScreen.styles";
import { GroupChatScreenContainer } from "../styles/screens/screen.styles";

/**
 * @remarks
 * group chat modal
 *
 * @description
 * this is where the user can:
 * - view chat messages and send messages of their own
 *
 * user can navigate from here to:
 * - user settings modal (user/UserSettingsScreen) -> by tapping user icon in bottom left.
 * - group settings modal (group/GroupSettingsScreen) -> by tapping user icon in upper right.
 * - group home screen (group/GroupHomeScreen) -> tapping the back icon in upper left.
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the group chat modal.
 */
export function GroupChatModal({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "GroupChat">): JSX.Element {
  const { gid, uid } = route.params;

  // hooks
  const [groupData, groupDataLoading, groupDataError] = useDocumentData(
    getGroupDocRef(db, gid)
  );
  const { groupName, groupIcon, members, self, chat } = useGroupData({
    uid,
    groupData,
  });
  useUpdateSelfMemberData({ uid, gid, self });
  const { text, setText, errors, submitMessage } = useChat({
    uid: uid,
    gid: gid,
    name: self.name,
    members: members,
    groupName: groupName,
  });

  return (
    <LinearGradientBackground colors={[colors.darkBlue, colors.blue]}>
      <GroupChatScreenContainer>
        <GroupChatContainer>
          {groupDataLoading ? (
            <FieldLabel>loading...</FieldLabel>
          ) : groupDataError ? (
            <FieldLabel>
              ack! something went wrong. please try again later...
            </FieldLabel>
          ) : (
            <>
              <GroupChatTopBar
                uid={uid}
                gid={gid}
                icon={groupIcon}
                navigation={navigation}
              />
              <GroupChatWindow
                messages={chat.messages}
                members={members}
                uid={uid}
                gid={gid}
              />
              <GroupChatBottomBar
                uid={uid}
                icon={self.icon}
                text={text}
                setText={setText}
                handleSubmit={submitMessage}
                errors={errors}
                navigation={navigation}
              />
            </>
          )}
        </GroupChatContainer>
      </GroupChatScreenContainer>
    </LinearGradientBackground>
  );
}
