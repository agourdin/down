import { signOut } from "@firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "../../App";
import { auth } from "../../firebase/firebase";
import { VALID_USER_ICONS } from "../../firebase/firestore/constants";
import { LinearGradientBackground } from "../components/global/backgrounds";
import {
  DefaultButton,
  RedCancelButton,
  GreyCancelButton,
} from "../components/global/buttons";
import { IconPicker } from "../components/global/IconPicker";
import { useGroupInvites } from "../hooks/invite";
import { useUser } from "../hooks/user";
import {
  DefaultContainer,
  FlowFieldContainer,
  FlowContents,
  FlowButtonsContainer,
} from "../styles/components/global/container.styles";
import { DefaultTextInputContainer } from "../styles/components/global/input.styles";
import {
  ScreenTitle,
  FieldLabel,
  FieldErrors,
} from "../styles/components/global/text.styles";
import { colors } from "../styles/global.styles";
import { LandingScreenContainer } from "../styles/screens/screen.styles";

/**
 * @remarks
 * user settings modal
 *
 * @description
 * this is where the user can:
 * - change their username.
 * - change their icon.
 * - sign out.
 *
 * user can navigate from here to:
 * - previous screen -> by completing the form and tapping the save button |
 * by tapping the nevermind button | by sliding the modal away.
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the user settings modal.
 */
export function UserSettingsModal({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "UserSettings">): JSX.Element {
  const { uid } = route.params;
  const {
    groupInvites,
    groupInvitesLoading,
    groupInvitesError,
    hasPendingInvites,
  } = useGroupInvites();

  const [successMessage, setSuccessMessage] = React.useState("save");
  const { userDataLoading, name, icon, setName, setIcon, errors, handleSave } =
    useUser(uid);

  const userInviteDocs = groupInvites?.docs;
  return (
    <LinearGradientBackground colors={[colors.darkBlue, colors.white]}>
      <LandingScreenContainer>
        {userDataLoading ? (
          <DefaultContainer justifyContent='space-around'>
            <FieldLabel>loading..</FieldLabel>
          </DefaultContainer>
        ) : (
          <DefaultContainer justifyContent='space-between'>
            <ScreenTitle>profile</ScreenTitle>
            {userInviteDocs ? (
              userInviteDocs?.length > 0 ? (
                <FlowFieldContainer>
                  <DefaultButton
                    title={
                      groupInvitesLoading
                        ? "loading..."
                        : groupInvitesError
                        ? "try later!"
                        : "view invites"
                    }
                    titleColor={colors.white}
                    bgColor={colors.yellow}
                    notifications={hasPendingInvites}
                    onPress={() => {
                      if (groupInvitesLoading || groupInvitesError) return;
                      return navigation.navigate("UserInvites", { uid: uid });
                    }}
                  />
                </FlowFieldContainer>
              ) : null
            ) : null}
            <FlowContents>
              <FlowFieldContainer>
                <FieldLabel>change your name</FieldLabel>
                <DefaultTextInputContainer
                  value={name}
                  placeholder='name'
                  onChangeText={setName}
                  fontSize='22'
                />
                {errors.nameError ? (
                  <FieldErrors>{errors.nameError}</FieldErrors>
                ) : null}
              </FlowFieldContainer>
              <FlowFieldContainer>
                <FieldLabel>change your icon</FieldLabel>
                <IconPicker
                  selected={icon}
                  setIcon={setIcon}
                  icons={VALID_USER_ICONS}
                />
                {errors.iconError ? (
                  <FieldErrors>{errors.iconError}</FieldErrors>
                ) : null}
              </FlowFieldContainer>
              <DefaultButton
                title={successMessage ?? "save"}
                margin='0px auto 48px auto'
                titleColor={colors.white}
                bgColor={colors.green}
                onPress={async () => {
                  await handleSave(() => {
                    setSuccessMessage("saved!");
                    const timer = setTimeout(() => {
                      setSuccessMessage("save");
                      clearTimeout(timer);
                    }, 1500);
                  });
                }}
              />
              <FlowFieldContainer>
                <FieldLabel>official stuff</FieldLabel>
                <DefaultButton
                  bgColor={colors.middleGrey}
                  margin='6px auto 6px auto'
                  width='175px'
                  size='sm'
                  title='change email'
                  titleColor={colors.white}
                  onPress={() => {
                    navigation.navigate("ChangeEmail");
                  }}
                />
                <DefaultButton
                  bgColor={colors.darkBlue}
                  margin='6px auto 48px auto'
                  width='175px'
                  size='sm'
                  title='change password'
                  titleColor={colors.white}
                  onPress={() => {
                    navigation.navigate("ChangePassword");
                  }}
                />
                <FieldLabel color={colors.red}>danger zone</FieldLabel>
                <RedCancelButton
                  margin='6px auto 48px auto'
                  width='175px'
                  size='sm'
                  title='sign out'
                  onPress={() => {
                    signOut(auth);
                  }}
                />
              </FlowFieldContainer>
            </FlowContents>
            <FlowButtonsContainer>
              <GreyCancelButton
                margin='12px auto 0px auto'
                title='back'
                onPress={navigation.goBack}
              />
            </FlowButtonsContainer>
          </DefaultContainer>
        )}
      </LandingScreenContainer>
    </LinearGradientBackground>
  );
}
