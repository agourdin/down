import {
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "@firebase/auth";
import { Link } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "../../App";
import { auth } from "../../firebase/firebase";
import { getCurrentUser } from "../../firebase/firestore/auth";
import { DownErrorCode, DownErrorMessages } from "../../utils/errors";
import { LinearGradientBackground } from "../components/global/backgrounds";
import { DefaultButton } from "../components/global/buttons";
import {
  DefaultContainer,
  TightHeightContainer,
} from "../styles/components/global/container.styles";
import { DefaultTextInputContainer } from "../styles/components/global/input.styles";
import {
  FieldLabel,
  FieldErrors,
  FieldSubLabel,
} from "../styles/components/global/text.styles";
import { colors } from "../styles/global.styles";
import { LandingScreenContainer } from "../styles/screens/screen.styles";

/**
 * @remarks
 * reauthentication modal
 *
 * @description
 * this is where a user will reauthenticate if they are prompted to.
 *
 * user may be navigated to here from:
 * - change password screen (auth/ChangePasswordScreen) -> after tapping change password button
 * if user needs to reauthenticate.
 * - change email screen (auth/ChangeEmailScreen) -> after tapping change email button
 * if user needs to reauthenticate.
 *
 * user can navigate from here to:
 * - previous screen -> by signing in or swiping away.
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the reauthenticate screen.
 */
export function ReauthenticateModal({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Reauthenticate">): JSX.Element {
  // TODO: convert this stuff to useAuthenticate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const user = getCurrentUser(auth);
  const credential = EmailAuthProvider.credential(email, password);
  return (
    <LinearGradientBackground colors={[colors.blue, colors.yellow, colors.red]}>
      <LandingScreenContainer>
        <DefaultContainer
          style={{ alignContent: "flex-end" }}></DefaultContainer>
        <TightHeightContainer>
          <FieldLabel>
            in order to continue you have to re-authenticate
          </FieldLabel>
          <DefaultTextInputContainer
            onLayout={() => {
              setEmail("");
              setPassword("");
              setErrorMessage("");
            }}
            value={email}
            bgColor={colors.white}
            textColor={colors.darkGrey}
            keyboardType='email-address'
            placeholder='email'
            onChangeText={(text) => {
              setEmail(text);
              setErrorMessage("");
            }}
          />
          <DefaultTextInputContainer
            value={password}
            bgColor={colors.white}
            textColor={colors.darkGrey}
            secureTextEntry
            placeholder='password'
            onChangeText={(text) => {
              setPassword(text);
              setErrorMessage("");
            }}
          />
          {errorMessage ? <FieldErrors>{errorMessage}</FieldErrors> : null}
          <DefaultButton
            title='re-authenticate'
            bgColor={colors.blue}
            titleColor={colors.white}
            onPress={() => {
              /* handle sign in */
              if (user && credential) {
                reauthenticateWithCredential(user, credential)
                  .then(() => {
                    navigation.pop();
                  })
                  .catch((error) => {
                    // Failed to sign in
                    const errorCode: DownErrorCode = error.code;
                    return setErrorMessage(DownErrorMessages[errorCode]);
                  });
              }
            }}
          />
          <FieldSubLabel>
            <Link to='/PasswordReset'>forgot password?</Link>
          </FieldSubLabel>
        </TightHeightContainer>
        <DefaultContainer />
      </LandingScreenContainer>
    </LinearGradientBackground>
  );
}
