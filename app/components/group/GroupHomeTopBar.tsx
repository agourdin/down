import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "../../../App";
import {
  TopBar,
  TopBarContainer,
} from "../../styles/components/global/container.styles";
import PressableIcon from "../global/PressableIcon";

export function GroupHomeTopBar({
  navigation,
  uid,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList
  >;
  uid: string;
}): JSX.Element {
  return (
    <TopBarContainer>
      <TopBar>
        <PressableIcon
          icon={"👈"}
          size='m'
          shadow
          onPress={() => {
            navigation.navigate("UserHome", {
              uid: uid,
            });
          }}
        />
      </TopBar>
    </TopBarContainer>
  );
}
