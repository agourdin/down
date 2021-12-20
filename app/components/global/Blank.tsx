import * as React from "react";
import { DefaultContainer } from "../../styles/components/global/container.styles";
import { ScreenTitle } from "../../styles/components/global/text.styles";
import { colors } from "../../styles/global.styles";
import { LandingScreenContainer } from "../../styles/screens/screen.styles";
import { LinearGradientBackground } from "./backgrounds";

export const Blank = ({ title }: { title: string }) => {
  return (
    <LinearGradientBackground colors={[colors.blue, colors.yellow, colors.red]}>
      <LandingScreenContainer>
        <DefaultContainer justifyContent='center'>
          <ScreenTitle>{title}</ScreenTitle>
        </DefaultContainer>
      </LandingScreenContainer>
    </LinearGradientBackground>
  );
};
