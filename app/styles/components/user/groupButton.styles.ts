import styled from "styled-components/native";
import { colors, BUTTON_SHADOW_STYLES } from "../../global.styles";
import { DefaultButtonTextProps } from "../global/button.styles";

export const GroupButtonContainer = styled.View`
  width: 100%;
  height: 72px;
  border-radius: 36px;
  margin: 6px;
  background-color: ${colors.white};
  ${BUTTON_SHADOW_STYLES}
`;

export const GroupButtonContents = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 6px;
`;

export const GroupButtonTextContainer = styled.TouchableOpacity`
  min-width: 120px;
  height: 100%;
  margin: auto;
`;

export const GroupButtonText = styled.Text<DefaultButtonTextProps>`
  font-size: 18px;
  text-align: center;
  font-family: "Medium";
  color: ${(props) => props.titleColor};
  margin: auto;
`;

export const GroupButtonItemContainer = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
`;

export const GroupButtonIcon = styled.Text`
  margin: auto;
`;

type GroupButtonUserStatusProps = {
  bgColor: string;
};
export const GroupButtonUserStatus = styled.View<GroupButtonUserStatusProps>`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 10000px;
  background-color: ${(props) => props.bgColor};
  font-size: 24px;
`;
