import * as React from "react";
import { LinearGradientBackground } from "./components/global/backgrounds";
import { Twemoji } from "./components/global/Twemoji";
import { DefaultContainer } from "./styles/components/global/container.styles";
import { colors } from "./styles/global.styles";
import { LandingScreenContainer } from "./styles/screens/screen.styles";

/**
 * this is the initial loading screen for the app. it's what the user sees
 * when they're waiting for the app to initialize.
 *
 */
export function SplashScreen(): JSX.Element {
  return (
    <LinearGradientBackground colors={[colors.blue, colors.yellow, colors.red]}>
      <LandingScreenContainer>
        <DefaultContainer>
          <Twemoji size={72} emoji='👍' />
        </DefaultContainer>
      </LandingScreenContainer>
    </LinearGradientBackground>
  );
}
