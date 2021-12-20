import styled from "styled-components/native";
import { colors } from "../../global.styles";

export type DefaultInputContainerProps = {
  bgColor?: string;
  textColor?: string;
  fontSize?: string;
};

export const DefaultTextInputContainer = styled.TextInput<DefaultInputContainerProps>`
  width: 100%;
  height: ${(props) =>
    props.fontSize ? parseInt(props.fontSize) + 12 + "px" : "36px"};
  border-radius: 24px;
  margin-top: 6px;
  margin-bottom: 6px;
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : colors.white};
  font-size: ${(props) => (props.fontSize ? props.fontSize + "px" : "18px")};
  color: ${(props) => (props.textColor ? props.textColor : colors.darkGrey)};
  text-align: center;
  font-family: "Medium";
  shadow-color: ${colors.darkGrey};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.35;
  shadow-radius: 4px;
`;
