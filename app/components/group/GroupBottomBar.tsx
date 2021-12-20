import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "../../../App";
import { Member } from "../../../firebase/firestore/groups";
import {
  GroupBottomBarButton,
  GroupBottomBarButtonContainer,
  GroupBottomBarContainer,
  GroupBottomBarContents,
  GroupBottomBarUserStatus,
  GroupBottomBarUserStatusContainer,
} from "../../styles/components/group/groupBottomBar.styles";
import DownStatus from "../global/DownStatus";
import PressableIcon from "../global/PressableIcon";
import { Twemoji } from "../global/Twemoji";

export function GroupBottomBar({
  navigation,
  gid,
  uid,
  toggleDown,
  self,
  unseenMessages,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, "GroupHome">;
  gid: string;
  uid: string;
  toggleDown: () => void;
  self: Member;
  unseenMessages: boolean;
  onPress?: () => void;
}): JSX.Element {
  return (
    <GroupBottomBarContainer>
      <GroupBottomBarContents>
        <GroupBottomBarButtonContainer>
          <GroupBottomBarButton
            onPress={() =>
              navigation.navigate("GroupChat", { gid: gid, uid: uid })
            }>
            <Twemoji size={36} emoji={"💬"} notifications={unseenMessages} />
          </GroupBottomBarButton>
        </GroupBottomBarButtonContainer>
        <GroupBottomBarUserStatusContainer>
          <GroupBottomBarUserStatus>
            <DownStatus
              down={self.down}
              size='lg'
              button
              onPress={toggleDown}
            />
          </GroupBottomBarUserStatus>
        </GroupBottomBarUserStatusContainer>
        <GroupBottomBarButtonContainer>
          <GroupBottomBarButton>
            <PressableIcon
              icon={self.icon}
              size='m'
              onPress={() => navigation.navigate("UserSettings", { uid: uid })}
            />
          </GroupBottomBarButton>
        </GroupBottomBarButtonContainer>
      </GroupBottomBarContents>
    </GroupBottomBarContainer>
  );
}
