import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "../../App";
import { auth } from "../../firebase/firebase";
import { getCurrentUser, changePassword } from "../../firebase/firestore/auth";
import { DownErrorCode, DownErrorMessages } from "../../utils/errors";
import { LinearGradientBackground } from "../components/global/backgrounds";
import { DefaultButton, GreyCancelButton } from "../components/global/buttons";
import {
  DefaultContainer,
  TightHeightContainer,
} from "../styles/components/global/container.styles";
import { DefaultTextInputContainer } from "../styles/components/global/input.styles";
import {
  ScreenTitle,
  FieldErrors,
  FieldSuccess,
} from "../styles/components/global/text.styles";
import { colors } from "../styles/global.styles";
import { LandingScreenContainer } from "../styles/screens/screen.styles";

/**
 * @remarks
 * change password modal
 *
 * @description
 * this is where the user can update their password.
 *
 * user may be navigated from here to:
 * - reauthenticate modal (auth/ReauthenticateScreen) -> after tapping change password button
 * if user needs to reauthenticate.
 *
 * user can navigate from here to:
 * - user settings modal (user/UserSettingsScreen) -> by tapping nevermind or swiping away.
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the change password modal.
 */
export function ChangePasswordModal({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ChangePassword">): JSX.Element {
  // TODO: add this stuff into useAuthenticate();
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const user = getCurrentUser(auth);
  return (
    <LinearGradientBackground colors={[colors.darkBlue, colors.blue]}>
      <LandingScreenContainer>
        <DefaultContainer style={{ alignContent: "flex-end" }}>
          <ScreenTitle>change password</ScreenTitle>
        </DefaultContainer>
        <TightHeightContainer>
          <DefaultTextInputContainer
            value={password}
            bgColor={colors.white}
            textColor={colors.darkGrey}
            keyboardType='visible-password'
            placeholder='password'
            onChangeText={setPassword}
          />
          <DefaultTextInputContainer
            value={password2}
            bgColor={colors.white}
            textColor={colors.darkGrey}
            keyboardType='visible-password'
            placeholder='repeat password'
            onChangeText={setPassword2}
          />
          {errorMessage ? <FieldErrors>{errorMessage}</FieldErrors> : null}
          {successMessage ? (
            <FieldSuccess>{successMessage}</FieldSuccess>
          ) : null}
          <DefaultButton
            title='change password'
            bgColor={colors.blue}
            titleColor={colors.white}
            onPress={() => {
              /* handle password reset */
              if (user) {
                changePassword(user, password, password2)
                  .then(() => {
                    setSuccessMessage("password reset!");
                    const timer = setTimeout(() => {
                      navigation.pop();
                      clearTimeout(timer);
                    }, 3000);
                  })
                  .catch((error) => {
                    if (error.code.match(/.*requires-recent-login.*/)) {
                      return navigation.navigate("Reauthenticate");
                    }
                    let code: DownErrorCode = error.code;
                    if (code) {
                      return setErrorMessage(DownErrorMessages[code]);
                    }
                  });
              }
            }}
          />
        </TightHeightContainer>
        <DefaultContainer>
          <GreyCancelButton title='nevermind' onPress={navigation.goBack} />
        </DefaultContainer>
      </LandingScreenContainer>
    </LinearGradientBackground>
  );
}
