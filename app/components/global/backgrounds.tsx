import { LinearGradient } from "expo-linear-gradient";
import React from "react";

export type LinearGradientBackgroundProps = {
  colors: string[];
};

/**
 * returns the standard linear gradient component for use across the app. accepts
 * as one of its params a list of colors for which to use in the gradient.
 *
 * @param params `{children: JSX.Element[], colors: string[]}`
 * @returns
 */
export const LinearGradientBackground = ({
  children,
  colors,
}: React.PropsWithChildren<LinearGradientBackgroundProps>) => {
  return (
    <LinearGradient colors={colors} start={{ x: 1, y: 0 }} style={{ flex: 1 }}>
      {children}
    </LinearGradient>
  );
};
