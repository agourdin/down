/**
 * LANDING SCREEN
 *
 * Description:
 *    This is the landing screen for the app. It's what the user sees
 *    when they're not signed in.
 *
 * Navigation:
 *    User can navigate from here to:
 *      Sign in (auth/SignInScreen) -> by tapping sign in button
 *      Sign up (auth/SignUpScreen) -> by tapping sign up button
 *
 * TO DO:
 *    * Animate the title
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { Animated } from "react-native";
import { RootStackParamList } from "../App";
import { LinearGradientBackground } from "./components/global/backgrounds";
import { DefaultButton } from "./components/global/buttons";
import { Twemoji } from "./components/global/Twemoji";
import {
  DefaultContainer,
  TightHeightContainer,
} from "./styles/components/global/container.styles";
import { MainTitle } from "./styles/components/global/text.styles";
import { colors } from "./styles/global.styles";
import { LandingScreenContainer } from "./styles/screens/screen.styles";

/**
 * @remarks
 * landing screen
 *
 * @description
 * this is where the user can get to the sign in or sign up screens.
 *
 * user can navigate from here to:
 * - sign up screen (user/SignUpScreen) -> by tapping sign up button.
 * - sign in screen (auth/SignInScreen) -> by tapping sign in button.
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the landing screen.
 */
export function LandingScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Landing">): JSX.Element {
  return (
    <LinearGradientBackground colors={[colors.blue, colors.yellow, colors.red]}>
      <LandingScreenContainer>
        <DefaultContainer>
          <AnimatedDown
            startingY={0}
            endingY={72}
            startingOpacity={0}
            endingOpacity={1}>
            <Twemoji size={72} emoji='👍' />
          </AnimatedDown>
          <AnimatedDown
            startingY={0}
            endingY={72}
            startingOpacity={1}
            endingOpacity={0}>
            <MainTitle>down</MainTitle>
          </AnimatedDown>
        </DefaultContainer>
        <TightHeightContainer>
          <DefaultButton
            title='sign in'
            bgColor={colors.blue}
            titleColor={colors.white}
            onPress={() => {
              /* navigate to the SignIn route */
              navigation.navigate("SignIn");
            }}
          />
          <DefaultButton
            title='sign up'
            bgColor={colors.yellow}
            titleColor={colors.white}
            onPress={() => {
              /* navigate to the SignUp route */
              navigation.navigate("SignUp");
            }}
          />
        </TightHeightContainer>
      </LandingScreenContainer>
    </LinearGradientBackground>
  );
}

const TRANSITION_DURATION = 500;
const PAUSE_DURATION = 2000;

const AnimatedDown = ({
  startingY,
  endingY,
  startingOpacity,
  endingOpacity,
  children,
}: {
  startingY: number;
  endingY: number;
  startingOpacity: number;
  endingOpacity: number;
  children: JSX.Element | JSX.Element[] | null;
}) => {
  const yVal = React.useRef(new Animated.Value(startingY)).current;
  const opacity = React.useRef(new Animated.Value(startingOpacity)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(yVal, {
          toValue: startingY,
          duration: TRANSITION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(yVal, {
          toValue: startingY,
          duration: PAUSE_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(yVal, {
          toValue: endingY,
          duration: TRANSITION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(yVal, {
          toValue: endingY,
          duration: PAUSE_DURATION,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: startingOpacity,
          duration: TRANSITION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: startingOpacity,
          duration: PAUSE_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: endingOpacity,
          duration: TRANSITION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: endingOpacity,
          duration: PAUSE_DURATION,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{ transform: [{ translateY: yVal }], opacity: opacity }}>
      {children}
    </Animated.View>
  );
};
