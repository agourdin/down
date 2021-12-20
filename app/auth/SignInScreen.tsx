import { Link } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "../../App";
import { signInWithEmail } from "../../firebase/firestore/auth";
import { DownErrorCode, DownErrorMessages } from "../../utils/errors";
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
  FieldSubLabel,
} from "../styles/components/global/text.styles";
import { colors } from "../styles/global.styles";
import { LandingScreenContainer } from "../styles/screens/screen.styles";

/**
 * @remarks
 * sign in screen
 *
 * @description
 * this is where the user can sign in using their email and password.
 *
 * user can navigate from here to:
 * - user home screen (user/UserHomeScreen) -> by signing in.
 * - sign up screen (auth/SignUpScreen) -> by tapping sign up button.
 * - password reset screen (auth/PasswordResetScreen) -> by tapping forgot password? link.
 * - landing screen (/LandingScreen) -> by swiping back.
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the sign in screen.
 */
export function SignInScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "SignIn">): JSX.Element {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  return (
    <LinearGradientBackground colors={[colors.blue, colors.yellow, colors.red]}>
      <LandingScreenContainer>
        <DefaultContainer style={{ alignContent: "flex-end" }}>
          <MainTitle>down</MainTitle>
        </DefaultContainer>
        <TightHeightContainer>
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
            title='sign in'
            bgColor={colors.blue}
            titleColor={colors.white}
            onPress={() => {
              /* handle sign in */
              signInWithEmail(email, password).catch((error) => {
                // Failed to sign in
                const errorCode: DownErrorCode = error.code;
                return setErrorMessage(DownErrorMessages[errorCode]);
              });
            }}
          />
          <FieldSubLabel>
            <Link to='/PasswordReset'>forgot password?</Link>
          </FieldSubLabel>
        </TightHeightContainer>
        <DefaultContainer>
          <DefaultButton
            title='sign up'
            bgColor={colors.yellow}
            titleColor={colors.white}
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
