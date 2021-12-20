import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "../../../App";
import {
  DefaultContainer,
  TightHeightContainer,
} from "../../styles/components/global/container.styles";
import { GroupListScrollView } from "../../styles/components/user/userHomeGroups.styles";
import { GroupButton } from "./GroupButton";
import { NoGroups } from "./NoGroups";

export function UserHomeGroups({
  navigation,
  groups,
  uid,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, "UserHome">;
  groups: string[];
  uid: string;
}): JSX.Element {
  return (
    <DefaultContainer>
      <TightHeightContainer>
        <GroupListScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}>
          {groups?.length > 0 ? (
            groups.map((gid: string) => {
              return (
                <GroupButton
                  key={gid}
                  uid={uid}
                  gid={gid}
                  onPress={() => {
                    navigation.navigate("GroupHome", { gid: gid, uid: uid });
                  }}
                />
              );
            })
          ) : (
            <NoGroups />
          )}
        </GroupListScrollView>
      </TightHeightContainer>
    </DefaultContainer>
  );
}
