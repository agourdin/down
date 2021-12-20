import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "../../App";
import { LinearGradientBackground } from "../components/global/backgrounds";
import { DefaultButton } from "../components/global/buttons";
import { useAuthenticate } from "../hooks/auth";
import {
  DefaultContainer,
  TightHeightContainer,
} from "../styles/components/global/container.styles";
import { DefaultTextInputContainer } from "../styles/components/global/input.styles";
import {
  MainTitle,
  FieldErrors,
} from "../styles/components/global/text.styles";
import { colors } from "../styles/global.styles";
import { LandingScreenContainer } from "../styles/screens/screen.styles";

/**
 * @remarks
 * sign up screen
 *
 * @description
 * this is where the user can sign up using their email.
 *
 * user can navigate from here to:
 * - user home screen (user/UserHomeScreen) -> by signing up.
 * - sign in screen (auth/SignInScreen) -> by tapping sign in button.
 * - landing screen (/LandingScreen) -> by swiping back.
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the sign up screen.
 */
export function SignUpScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "SignUp">): JSX.Element {
  const {
    email,
    setEmail,
    password,
    setPassword,
    password2,
    setPassword2,
    errors,
    setErrors,
    handleSignUpByEmail,
  } = useAuthenticate();

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
            onChangeText={(text) => {
              setErrors("");
              setEmail(text.toLowerCase());
            }}
          />
          <DefaultTextInputContainer
            value={password}
            bgColor={colors.white}
            textColor={colors.darkGrey}
            secureTextEntry
            placeholder='password'
            onChangeText={(text) => {
              setErrors("");
              setPassword(text);
            }}
          />
          <DefaultTextInputContainer
            value={password2}
            bgColor={colors.white}
            textColor={colors.darkGrey}
            secureTextEntry
            placeholder='repeat password'
            onChangeText={(text) => {
              setErrors("");
              setPassword2(text);
            }}
          />
          {errors ? <FieldErrors>{errors}</FieldErrors> : null}
          <DefaultButton
            title='sign up'
            bgColor={colors.yellow}
            titleColor={colors.white}
            onPress={() => {
              /* handle sign up */
              handleSignUpByEmail();
            }}
          />
        </TightHeightContainer>
        <DefaultContainer>
          <DefaultButton
            title='sign in'
            bgColor={colors.blue}
            titleColor={colors.white}
            onPress={() => {
              /* navigate to the SignIn route */
              navigation.navigate("SignIn");
            }}
          />
        </DefaultContainer>
      </LandingScreenContainer>
    </LinearGradientBackground>
  );
}
