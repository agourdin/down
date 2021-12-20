import styled from "styled-components/native";
import { BUTTON_SHADOW_STYLES, colors } from "../../global.styles";

type DefaultContainerProps = {
  justifyContent?: string;
  bgColor?: string;
};

export const DefaultContainer = styled.View<DefaultContainerProps>`
  flex: 1;
  align-items: center;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  width: 100%;
  ${(props) =>
    props.bgColor ? `background-color: ${props.bgColor}` : "transparent"}
`;

export const TightHeightContainer = styled.View`
  width: 100%;
`;

export const FlowContents = styled.ScrollView`
  width: 100%;
  padding: 12px;
`;

export const FlowFieldContainer = styled.View`
  width: 100%;
  margin-bottom: 24px;
`;

export type FlowButtonsContainerProps = {
  direction?: string;
};
export const FlowButtonsContainer = styled.View<FlowButtonsContainerProps>`
  width: 100%;
  ${(props) => (props.direction ? `flex-direction: ${props.direction}` : "")}
`;

export const TopBarContainer = styled.View`
  height: 48px;
  width: 100%;
`;

export const TopBar = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: -12px;
  margin-right: -12px;
`;

type DownStatusContainerProps = {
  down?: boolean;
  size?: string;
  button?: boolean;
  loading?: boolean;
};
export const DownStatusContainer = styled.TouchableOpacity<DownStatusContainerProps>`
  ${(props) =>
    props.size === "xs"
      ? `width: 36px;
    height: 36px;
    `
      : props.size === "sm"
      ? `
    width: 48px;
    height: 48px;
  `
      : props.size === "lg"
      ? `
    width: 96px;
    height: 96px;
  `
      : `
    width: 64px;
    height: 64px;
  `}
`;

type DownStatusBackgroundProps = {
  down?: boolean;
  size?: string;
  button?: boolean;
  loading?: boolean;
};

export const DownStatusBackground = styled.View<DownStatusBackgroundProps>`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 10000px;
  background-color: ${(props) =>
    props.loading ? colors.lightGrey : props.down ? colors.green : colors.red};
  font-size: ${(props) =>
    props.size === "xs"
      ? "10px"
      : props.size === "sm"
      ? "22px"
      : props.size === "lg"
      ? "48px"
      : "24px"};
  ${(props) => (props.button ? BUTTON_SHADOW_STYLES : "")}
`;

type UserIconContainerProps = {
  size?: string;
  bgColor?: string;
  shadow?: boolean;
};
export const PressableIconContainer = styled.TouchableOpacity<UserIconContainerProps>`
  ${(props) =>
    props.size === "sm"
      ? `
    width: 48px;
    height: 48px;
  `
      : props.size === "m"
      ? `
      width: 64px;
      height: 64px
  `
      : props.size === "lg"
      ? `
    width: 96px;
    height: 96px;
  `
      : `
    width: 64px;
    height: 64px;
  `}
`;

type PressableIconBackgroundProps = {
  size?: string;
  bgColor?: string;
  shadow?: boolean;
};

export const PressableIconBackground = styled.View<PressableIconBackgroundProps>`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 10000px;
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : "transparent"};
  font-size: ${(props) =>
    props.size === "sm"
      ? "22px"
      : props.size === "m"
      ? "36px"
      : props.size === "lg"
      ? "48px"
      : "24px"};
  ${(props) => (props.shadow ? BUTTON_SHADOW_STYLES : "")}
`;
