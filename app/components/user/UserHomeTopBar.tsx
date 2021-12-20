import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "../../../App";
import {
  TopBar,
  TopBarContainer,
} from "../../styles/components/global/container.styles";
import { colors } from "../../styles/global.styles";
import { DefaultButton } from "../global/buttons";
import PressableIcon from "../global/PressableIcon";

export function UserHomeTopBar({
  navigation,
  uid,
  icon,
  notifications,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList
  >;
  uid: string;
  icon: string;
  notifications: boolean;
}): JSX.Element {
  return (
    <TopBarContainer>
      <TopBar>
        <DefaultButton
          title='+ invite'
          titleColor={colors.darkGrey}
          bgColor={colors.yellow}
          size={"sm"}
          tight
          onPress={() => {
            navigation.navigate("InviteToApp", { uid: uid });
          }}
        />
        <PressableIcon
          icon={icon}
          size='m'
          shadow
          onPress={() => {
            navigation.navigate("UserSettings", {
              uid: uid,
            });
          }}
          notifications={notifications}
        />
      </TopBar>
    </TopBarContainer>
  );
}
