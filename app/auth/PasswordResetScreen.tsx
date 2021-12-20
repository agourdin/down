import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "../../App";
import { auth } from "../../firebase/firebase";
import { resetPassword } from "../../firebase/firestore/auth";
import { LinearGradientBackground } from "../components/global/backgrounds";
import { DefaultButton } from "../components/global/buttons";
import {
  DefaultContainer,
  TightHeightContainer,
} from "../styles/components/global/container.styles";
import { DefaultTextInputContainer } from "../styles/components/global/input.styles";
import {
  MainTitle,
  FieldErrors,
  FieldSuccess,
} from "../styles/components/global/text.styles";
import { colors } from "../styles/global.styles";
import { LandingScreenContainer } from "../styles/screens/screen.styles";

/**
 * @remarks
 * password reset screen
 *
 * @description
 * this is where the user can send themselves a password reset email.
 *
 * user can navigate from here to:
 * - user home screen (user/UserHomeScreen) -> by signing in.
 * - sign in screen (auth/SignInScreen) -> by tapping sign up button.
 * - sign up screen (auth/SignUpScreen) -> by tapping sign up button
 * - landing screen (/LandingScreen) -> by swiping back.
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the password reset screen.
 */
export function PasswordResetScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "PasswordReset">): JSX.Element {
  const [email, setEmail] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  return (
    <LinearGradientBackground colors={[colors.blue, colors.yellow, colors.red]}>
      <LandingScreenContainer>
        <DefaultContainer style={{ alignContent: "flex-end" }}>
          <MainTitle>down</MainTitle>
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
          {errorMessage ? <FieldErrors>{errorMessage}</FieldErrors> : null}
          {successMessage ? (
            <FieldSuccess>{successMessage}</FieldSuccess>
          ) : null}
          <DefaultButton
            title='reset password'
            bgColor={colors.blue}
            titleColor={colors.white}
            onPress={() => {
              /* handle password reset */
              resetPassword(auth, email)
                .then(() => {
                  setSuccessMessage("password reset link sent!");
                })
                .catch((error) => {
                  if (error.code.match(/.*email-empty.*/)) {
                    setErrorMessage("email can't be empty!");
                    return;
                  }
                  if (error.code.match(/.*internal-error.*/)) {
                    setErrorMessage("internal error, try again!");
                    return;
                  }
                });
            }}
          />
        </TightHeightContainer>
        <DefaultContainer>
          <DefaultButton
            title='sign in'
            bgColor={colors.blue}
            titleColor={colors.white}
            size='sm'
            onPress={() => {
              /* navigate to the SignIn route */
              navigation.navigate("SignIn");
            }}
          />
          <DefaultButton
            title='sign up'
            bgColor={colors.yellow}
            titleColor={colors.white}
            size='sm'
            onPress={() => {
              /* navigate to the SignUp route */
              navigation.navigate("SignUp");
            }}
          />
        </DefaultContainer>
      </LandingScreenContainer>
    </LinearGradientBackground>
  );
}
