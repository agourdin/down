import * as React from "react";
import { DefaultContainer } from "../../styles/components/global/container.styles";
import { FieldLabel } from "../../styles/components/global/text.styles";
import { colors } from "../../styles/global.styles";
import { LandingScreenContainer } from "../../styles/screens/screen.styles";
import { LinearGradientBackground } from "./backgrounds";
import { Twemoji } from "./Twemoji";

/**
 * @returns a global error screen.
 */
export const Error = () => {
  return (
    <LinearGradientBackground colors={[colors.blue, colors.yellow, colors.red]}>
      <LandingScreenContainer>
        <DefaultContainer justifyContent='center'>
          <Twemoji size={72} emoji={"😵"} />
          <FieldLabel />
          <FieldLabel>
            oof. either you're offline or there's been an error on our
            end--please try again later.
          </FieldLabel>
        </DefaultContainer>
      </LandingScreenContainer>
    </LinearGradientBackground>
  );
};
