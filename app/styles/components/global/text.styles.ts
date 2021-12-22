import styled from "styled-components/native";
import { colors } from "../../global.styles";

type TextProps = {
  color?: string;
  underline?: boolean;
};

export const MainTitle = styled.Text`
  font-size: 72px;
  color: ${colors.white};
  font-family: "MediumItalic";
`;

export const ScreenTitle = styled.Text`
  text-align: center;
  font-size: 48px;
  color: ${colors.white};
  font-family: "MediumItalic";
  margin-bottom: 12px;
`;

export const FlowTitle = styled.Text`
  text-align: center;
  font-size: 36px;
  color: ${colors.white};
  font-family: "MediumItalic";
  margin-bottom: 12px;
`;

export const FlowHeader = styled.Text`
  text-align: center;
  font-size: 30px;
  color: ${colors.white};
  font-family: "MediumItalic";
  margin-bottom: 12px;
`;

export const FieldLabel = styled.Text<TextProps>`
  width: 100%;
  text-align: center;
  font-size: 24px;
  color: ${(props) => (props.color ? props.color : colors.white)};
  font-family: "Medium";
  margin-bottom: 6px;
  ${(props) => (props.underline ? "text-decoration: underline" : "")}
`;

export const FieldDescription = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: ${colors.white};
  font-family: "Medium";
  margin-bottom: 3px;
`;

export const FieldSubLabel = styled.Text<TextProps>`
  text-align: center;
  font-size: 16px;
  color: ${(props) => (props.color ? props.color : colors.white)};
  font-family: "MediumItalic";
  margin-top: 6px;
  margin-bottom: 6px;
`;

export const FieldErrors = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${colors.red};
  font-family: "MediumItalic";
  margin-bottom: 6px;
`;

export const FieldSuccess = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${colors.white};
  font-family: "MediumItalic";
  margin-bottom: 6px;
`;

export const NotificationsTagContainer = styled.View`
  position: absolute;
  top: -5px;
  right: -5px;
  z-index: 1;
  width: 18px;
  height: 18px;
  background-color: ${colors.red};
  border-radius: 10000px;
  align-items: center;
  justify-content: center;
`;

export const NotificationsTagContents = styled.Text`
  color: ${colors.white};
  font-family: "Medium";
  font-size: 12px;
`;
