import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { RootStackParamList } from "../App";
import { db } from "../firebase/firebase";
import {
  getUserDocRef,
  getPrivateDataDocRef,
} from "../firebase/firestore/users";
import { LinearGradientBackground } from "./components/global/backgrounds";
import { Blank } from "./components/global/Blank";
import { DefaultButton } from "./components/global/buttons";
import { Error } from "./components/global/Error";
import { Loading } from "./components/global/Loading";
import { UserHomeGroups } from "./components/user/UserHomeGroups";
import { UserHomeTopBar } from "./components/user/UserHomeTopBar";
import { useGroupInvites } from "./hooks/invite";
import { DefaultContainer } from "./styles/components/global/container.styles";
import { colors } from "./styles/global.styles";
import { UserScreenContainer } from "./styles/screens/screen.styles";

/**
 * @remarks
 * home screen
 *
 * @description
 * this is where the user can:
 * - view the groups they're in, along with their status in each.
 * - create a new group.
 * - invite a friend to the app.
 * - access their user settings.
 *
 * note: when a new user (i.e. a user who does not yet have a user doc) comes to this screen
 * they will be navigated to the NewUserScreen automatically.
 *
 * user can navigate from here to:
 * - group home screen (group/GroupHomeScreen) -> by tapping on an existing group.
 * - create new group modal (user/NewGroupScreen) -> by tapping create group button.
 * - user settings modal (user/UserSettingsScreen) -> by tapping user icon in upper right.
 * - invite to app screen (auth/InviteToAppScreen) -> by tapping the invite button in upper left.
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the home screen.
 */
export function HomeScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "UserHome">): JSX.Element {
  const { uid } = route.params;

  // public user data
  const [userDoc, userDocLoading, userDocError] = useDocument(
    getUserDocRef(db, uid)
  );

  // private user data
  const [privateDataDoc, privateDataDocLoading, privateDataDocError] =
    useDocument(getPrivateDataDocRef(db, uid));

  const { hasPendingInvites } = useGroupInvites();

  if (userDocLoading || privateDataDocLoading) return <Loading />;

  if (!userDoc?.exists()) {
    navigation.navigate("NewUser", { uid: uid });
    return <Blank title='welcome' />;
  }

  if (userDocError || privateDataDocError) return <Error />;

  return (
    <LinearGradientBackground colors={[colors.blue, colors.yellow, colors.red]}>
      <UserScreenContainer>
        <DefaultContainer justifyContent='space-between'>
          {/* TOP BAR */}
          <UserHomeTopBar
            uid={uid}
            icon={userDoc.data().icon}
            navigation={navigation}
            notifications={hasPendingInvites}
          />
          {/* GROUPS */}

          <UserHomeGroups
            uid={uid}
            groups={privateDataDoc?.data()?.groups}
            navigation={navigation}
          />

          {/* NEW GROUP BUTTON */}
          <DefaultButton
            title='+ new group'
            bgColor={colors.green}
            titleColor={colors.white}
            onPress={() => {
              /* Navigate to the NewGroup route */
              navigation.navigate("NewGroup", { uid: uid });
            }}
          />
        </DefaultContainer>
      </UserScreenContainer>
    </LinearGradientBackground>
  );
}
