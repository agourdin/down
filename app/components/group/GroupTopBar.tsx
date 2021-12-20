import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "../../../App";
import {
  GroupTopBarButton,
  GroupTopBarButtonContainer,
  GroupTopBarContainer,
  GroupTopBarContents,
  GroupTopBarName,
  GroupTopBarNameContainer,
} from "../../styles/components/group/groupTopBar.styles";
import { RoundInviteButton } from "../global/buttons";
import PressableIcon from "../global/PressableIcon";

export function GroupTopBar({
  uid,
  gid,
  groupName,
  groupIcon,
  navigation,
}: {
  uid: string;
  gid: string;
  groupName: string;
  groupIcon: string;
  navigation: NativeStackNavigationProp<RootStackParamList, "GroupHome">;
}): JSX.Element {
  return (
    <GroupTopBarContainer>
      <GroupTopBarContents>
        <GroupTopBarButtonContainer>
          <GroupTopBarButton>
            <RoundInviteButton
              title=''
              onPress={() => {
                navigation.navigate("InviteToGroup", { uid: uid, gid: gid });
              }}
            />
          </GroupTopBarButton>
        </GroupTopBarButtonContainer>
        <GroupTopBarNameContainer>
          <GroupTopBarName>{groupName}</GroupTopBarName>
        </GroupTopBarNameContainer>
        <GroupTopBarButtonContainer>
          <GroupTopBarButton>
            <PressableIcon
              icon={groupIcon}
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
