import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "../../App";
import { auth } from "../../firebase/firebase";
import { getCurrentUser, changeEmail } from "../../firebase/firestore/auth";
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
 * change email modal
 *
 * @description
 * this is where the user can update their email.
 *
 * user may be navigated from here to:
 * - reauthenticate modal (auth/ReauthenticateScreen) -> after tapping change email button
 * if user needs to reauthenticate.
 *
 * user can navigate from here to:
 * - user settings modal (user/UserSettingsScreen) -> by tapping nevermind or swiping away.
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the change email modal.
 */
export function ChangeEmailModal({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ChangeEmail">): JSX.Element {
  // TODO: add this stuff into useAuthenticate();
  const [email, setEmail] = React.useState("");
  const [email2, setEmail2] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const user = getCurrentUser(auth);

  return (
    <LinearGradientBackground colors={[colors.middleGrey, colors.lightGrey]}>
      <LandingScreenContainer>
        <DefaultContainer style={{ alignContent: "flex-end" }}>
          <ScreenTitle>change email</ScreenTitle>
        </DefaultContainer>
        <TightHeightContainer>
          <DefaultTextInputContainer
            value={email}
            bgColor={colors.white}
            textColor={colors.darkGrey}
            keyboardType='email-address'
            placeholder='email'
            onChangeText={setEmail}
          />
          <DefaultTextInputContainer
            value={email2}
            bgColor={colors.white}
            textColor={colors.darkGrey}
            keyboardType='email-address'
            placeholder='repeat email'
            onChangeText={setEmail2}
          />
          {errorMessage ? <FieldErrors>{errorMessage}</FieldErrors> : null}
          {successMessage ? (
            <FieldSuccess>{successMessage}</FieldSuccess>
          ) : null}
          <DefaultButton
            title='change email'
            bgColor={colors.middleGrey}
            titleColor={colors.white}
            onPress={() => {
              /* handle email change */
              if (user) {
                changeEmail(user, email, email2)
                  .then(() => {
                    setSuccessMessage("email reset!");
                    const timer = setTimeout(() => {
                      navigation.pop();
                      clearTimeout(timer);
                    }, 3000);
                  })
                  .catch((error: any) => {
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
