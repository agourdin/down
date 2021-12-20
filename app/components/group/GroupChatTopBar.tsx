import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import {
  GroupTopBarButton,
  GroupTopBarButtonContainer,
  GroupTopBarContainer,
  GroupTopBarContents,
  GroupTopBarName,
  GroupTopBarNameContainer,
} from "../../styles/components/group/groupTopBar.styles";
import { Twemoji } from "../global/Twemoji";
import PressableIcon from "../global/PressableIcon";
import { RootStackParamList } from "../../../App";

export function GroupChatTopBar({
  navigation,
  uid,
  gid,
  icon,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, "GroupChat">;
  uid: string;
  gid: string;
  icon: string;
}): JSX.Element {
  return (
    <GroupTopBarContainer>
      <GroupTopBarContents>
        <GroupTopBarButtonContainer>
          <GroupTopBarButton onPress={() => navigation.goBack()}>
            <Twemoji size={36} emoji='👈' />
          </GroupTopBarButton>
        </GroupTopBarButtonContainer>
        <GroupTopBarNameContainer>
          <GroupTopBarName>chat</GroupTopBarName>
        </GroupTopBarNameContainer>
        <GroupTopBarButtonContainer>
          <GroupTopBarButton>
            <PressableIcon
              icon={icon}
              size='m'
              onPress={() =>
                navigation.navigate("GroupSettings", { uid: uid, gid: gid })
              }
            />
          </GroupTopBarButton>
        </GroupTopBarButtonContainer>
      </GroupTopBarContents>
    </GroupTopBarContainer>
  );
}
