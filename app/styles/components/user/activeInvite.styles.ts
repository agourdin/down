import styled from "styled-components/native";
import { colors } from "../../global.styles";
import { DefaultButtonTextProps } from "../global/button.styles";

export const ActiveInviteContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 36px;
  background-color: ${colors.white};
`;

export const ActiveInviteContents = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 6px;
  margin-bottom: 12px;
`;

export const ActiveInviteItemContainer = styled.View`
  width: 36px;
  height: 36px;
`;

export const ActiveInviteGroupIcon = styled.Text`
  margin: auto;
`;

export const ActiveInviteGroupName = styled.Text<DefaultButtonTextProps>`
  font-size: 24px;
  text-align: left;
  font-family: "Medium";
  color: ${(props) => props.titleColor};
  margin-left: auto;
  margin-right: 24px;
`;

export const ActiveInviteButtonsContainer = styled.View`
  min-height: 36px;
  width: 200px;
  flex-direction: row;
`;

export const ActiveInviteResponseMessage = styled.Text<DefaultButtonTextProps>`
  font-size: 24px;
  text-align: center;
  font-family: "Medium";
  color: ${(props) => props.titleColor};
  margin-left: auto;
  margin-right: auto;
`;
