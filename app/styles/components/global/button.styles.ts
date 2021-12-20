import styled from "styled-components/native";
import { colors } from "../../global.styles";

const BUTTON_SHADOW_STYLES = `
  shadow-color: ${colors.darkGrey};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.35;
  shadow-radius: 4px;
`;

export type DefaultButtonContainerProps = {
  bgColor: string;
  titleColor: string;
  size?: string;
  width?: string;
  tight?: boolean;
  flex?: string | number;
  margin?: string;
};

export const DefaultButtonContainer = styled.TouchableOpacity<DefaultButtonContainerProps>`
  ${(props) =>
    props.tight ? "" : props.width ? "width: " + props.width : "width: 100%"};
  height: ${(props) => {
    return props.size === "xs"
      ? "30px"
      : props.size === "sm"
      ? "36px"
      : props.size === "lg"
      ? "64px"
      : "48px";
  }};
  border-radius: ${(props) => {
    return props.size === "xs"
      ? "15px"
      : props.size === "sm"
      ? "18px"
      : props.size === "lg"
      ? "32px"
      : "24px";
  }};
  padding: ${(props) => {
    return props.size === "xs" ? "2px 12px 2px 12px" : "6px 12px 6px 12px";
  }};
  margin: ${(props) => props.margin ?? "6px 0px 6px 0px"};
  background-color: ${(props) => props.bgColor};
  ${(props) => (props.flex ? `flex: ${props.flex}` : "")}
  ${BUTTON_SHADOW_STYLES}
`;

export type DefaultButtonTextProps = {
  titleColor: string;
  size?: string;
};

export const DefaultButtonText = styled.Text<DefaultButtonTextProps>`
  font-size: ${(props) => {
    return props.size === "xs"
      ? "12px"
      : props.size === "sm"
      ? "16px"
      : props.size === "lg"
      ? "32px"
      : "24px";
  }};
  margin: auto;
  text-align: center;
  font-family: "Medium";
  color: ${(props) => props.titleColor};
  width: 100%;
  flex-wrap: nowrap;
`;
