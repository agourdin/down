import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { PasswordResetScreen } from "./app/auth/PasswordResetScreen";
import { SignInScreen } from "./app/auth/SignInScreen";
import { SignUpScreen } from "./app/auth/SignUpScreen";
import { NotificationsWrapper } from "./app/components/notifications/Notifications";
import { GroupChatModal } from "./app/group/GroupChatModal";
import { GroupSettingsModal } from "./app/group/GroupSettingsModal";
import { InviteToGroupModal } from "./app/group/InviteToGroupModal";
import { GroupHomeScreen } from "./app/GroupScreen";
import { ChangeEmailModal } from "./app/home/ChangeEmailModal";
import { ChangePasswordModal } from "./app/home/ChangePasswordModal";
import { InviteToAppModal } from "./app/home/InviteToAppModal";
import { NewGroupModal } from "./app/home/NewGroupModal";
import { NewUserModal } from "./app/home/NewUserModal";
import { ReauthenticateModal } from "./app/home/ReauthenticateModal";
import { UserInvitesModal } from "./app/home/UserInvitesModal";
import { UserSettingsModal } from "./app/home/UserSettingsModal";
import { HomeScreen } from "./app/HomeScreen";
import { useRegisterForPushNotificationsAsync } from "./app/hooks/notifications";
import { LandingScreen } from "./app/LandingScreen";
import { SplashScreen } from "./app/SplashScreen";
import { auth, db } from "./firebase/firebase";
import { getUserId } from "./firebase/firestore/auth";
import { getPrivateDataDocRef } from "./firebase/firestore/users";

export type RootStackParamList = {
  Splash: undefined;
  Landing: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Reauthenticate: undefined;
  PasswordReset: undefined;
  ChangePassword: undefined;
  ChangeEmail: undefined;
  NewUser: { uid: string };
  UserHome: { uid: string };
  UserInvites: { uid: string };
  UserSettings: { uid: string };
  NewGroup: { uid: string };
  GroupHome: { gid: string; uid: string };
  GroupChat: { gid: string; uid: string };
  GroupSettings: { uid: string; gid: string };
  InviteToApp: { uid: string };
  InviteToGroup: { uid: string; gid: string };
  Details: { itemId: string; otherParam: string };
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function App(): JSX.Element | null {
  // load fonts
  const [fontsLoaded] = useFonts({
    Regular: require("./assets/fonts/DMMono-Regular.ttf"),
    Medium: require("./assets/fonts/DMMono-Medium.ttf"),
    Italic: require("./assets/fonts/DMMono-Italic.ttf"),
    MediumItalic: require("./assets/fonts/DMMono-MediumItalic.ttf"),
  });
  // load user
  const [user, userLoading, userError] = useAuthState(auth);
  const [privateData] = useDocumentData(getPrivateDataDocRef(db, getUserId()));
  // register for notifications
  useRegisterForPushNotificationsAsync(privateData);
  return (
    <NavigationContainer>
      <NotificationsWrapper>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {!fontsLoaded || userLoading ? (
            <>
              {/* ****** */}
              {/* SPLASH */}
              {/* ****** */}
              <RootStack.Screen name='Splash' component={SplashScreen} />
            </>
          ) : !user || userError ? (
            <>
              {/* **** */}
              {/* AUTH */}
              {/* **** */}
              <RootStack.Screen name='Landing' component={LandingScreen} />
              <RootStack.Screen name='SignUp' component={SignUpScreen} />
              <RootStack.Screen name='SignIn' component={SignInScreen} />
              <RootStack.Screen
                name='PasswordReset'
                component={PasswordResetScreen}
              />
            </>
          ) : (
            <>
              {/* **** */}
              {/* MAIN */}
              {/* **** */}
              <RootStack.Group>
                {/* USER HOME */}
                <RootStack.Screen
                  name='UserHome'
                  component={HomeScreen}
                  initialParams={{ uid: user.uid }}
                />

                {/* GROUP HOME */}
                <RootStack.Screen
                  name='GroupHome'
                  component={GroupHomeScreen}
                  initialParams={{ gid: "" }}
                />
              </RootStack.Group>

              {/* ****** */}
              {/* MODALS */}
              {/* ****** */}
              <RootStack.Group screenOptions={{ presentation: "modal" }}>
                {/* NEW USER */}
                <RootStack.Screen
                  options={{ gestureEnabled: false }}
                  name='NewUser'
                  component={NewUserModal}
                  initialParams={{ uid: user.uid }}
                />
                {/* NEW GROUP */}
                <RootStack.Screen
                  name='NewGroup'
                  component={NewGroupModal}
                  initialParams={{ uid: user.uid }}
                />
                {/* USER SETTINGS */}
                <RootStack.Screen
                  name='UserSettings'
                  component={UserSettingsModal}
                  initialParams={{ uid: user.uid }}
                />
                {/* USER INVITES */}
                <RootStack.Screen
                  name='UserInvites'
                  component={UserInvitesModal}
                  initialParams={{ uid: user.uid }}
                />
                {/* CHANGE PASSWORD */}
                <RootStack.Screen
                  name='ChangePassword'
                  component={ChangePasswordModal}
                />
                {/* CHANGE EMAIL */}
                <RootStack.Screen
                  name='ChangeEmail'
                  component={ChangeEmailModal}
                />
                {/* REAUTHENTICATE */}
                <RootStack.Screen
                  name='Reauthenticate'
                  component={ReauthenticateModal}
                />
                {/* GROUP CHAT */}
                <RootStack.Screen
                  name='GroupChat'
                  component={GroupChatModal}
                  initialParams={{ uid: user.uid, gid: "" }}
                />
                {/* GROUP SETTINGS */}
                <RootStack.Screen
                  name='GroupSettings'
                  component={GroupSettingsModal}
                  initialParams={{ uid: user.uid, gid: "" }}
                />
                {/* INVITE TO GROUP */}
                <RootStack.Screen
                  name='InviteToGroup'
                  component={InviteToGroupModal}
                  initialParams={{ uid: user.uid, gid: "" }}
                />
                {/* INVITE TO APP */}
                <RootStack.Screen
                  name='InviteToApp'
                  component={InviteToAppModal}
                  initialParams={{ uid: user.uid }}
                />
              </RootStack.Group>
            </>
          )}
        </RootStack.Navigator>
      </NotificationsWrapper>
    </NavigationContainer>
  );
}

export default App;
