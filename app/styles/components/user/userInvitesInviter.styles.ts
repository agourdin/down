import styled from "styled-components/native";
import { colors } from "../../global.styles";

export const InviterContainer = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  border-radius: 24px;
  padding: 24px 24px 24px 24px;
  margin-top: 12px;
  margin-bottom: 12px;
  width: 100%;
`;

export const InviterContents = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const InviterLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const InviterLabelContents = styled.View`
  width: 100%;
`;

export const InviterLabel = styled.Text`
  font-family: "Medium";
  font-size: 22px;
  text-align: center;
  margin-bottom: 12px;
  color: ${colors.darkGrey};
`;

export const InviterLabelMessage = styled.Text`
  font-family: "MediumItalic";
  font-size: 16px;
  text-align: center;
  margin-bottom: 12px;
  color: ${colors.darkGrey};
`;
