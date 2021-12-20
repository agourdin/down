import { createGlobalStyle } from "styled-components";

/* Types */
type Theme = {
  theme: {
    colors: {
      main: string;
      bodyBackgroundDefault: string;
      bodyBackground: string;
    };
  };
};

/* Global colors */
export const colors: { [index: string]: any } = {
  darkGrey: "#33312E",
  darkGreyRGB: "43, 48, 58",
  middleGrey: "#A6A6B5",
  middleGreyRGB: "124, 124, 124",
  lightGrey: "#E6E6EA",
  lightGreyRGB: "238, 229, 233",
  white: "#FFFFFF",
  whiteRGB: "255, 255, 255",
  red: "#F6511D",
  redRGB: "246, 81, 29",
  orange: "#F46C3E",
  orangeRGB: "244, 108, 62",
  yellow: "#FFB400",
  yellowRGB: "255, 180, 0",
  green: "#3BB273",
  greenRGB: "59, 178, 115",
  blue: "#53A2BE",
  blueRGB: "83, 162, 190",
  darkBlue: "#3F7CAC",
  darkBlueRGB: "63, 124, 172",
  darkGreen: "#3B6064",
  darkGreenRGB: "59, 96, 100",
};

/* Constants */

export const BUTTON_SHADOW_STYLES = `
  shadow-color: ${colors.darkGrey};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.35;
  shadow-radius: 4px;
`;
