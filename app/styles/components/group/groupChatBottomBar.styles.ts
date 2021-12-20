import styled from "styled-components/native";
import { colors } from "../../global.styles";
import { CHAT_FONT_SIZES } from "./constants";

export const GroupChatBottomBarContainer = styled.View`
  background-color: ${colors.white};
  width: 100%;
`;

export const GroupChatBottomBarErrors = styled.Text`
  width: 100%;
  font-family: "Regular";
  text-align: center;
  font-size: 12px;
  color: ${colors.red};
`;

export const GroupChatBottomBarContents = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const ICON_CONTAINER_SIZE = "36px";
export const GroupChatBottomBarUserIconContainer = styled.TouchableOpacity`
  width: ${ICON_CONTAINER_SIZE};
  height: ${ICON_CONTAINER_SIZE};
  margin-right: 6px;
  align-self: flex-end;
`;

export const GroupChatBottomBarSendIconContainer = styled.TouchableOpacity`
  width: ${ICON_CONTAINER_SIZE};
  height: ${ICON_CONTAINER_SIZE};
  margin-left: 6px;
  align-self: flex-end;
`;

export const GroupChatBottomBarIconContents = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const GroupChatBottomBarTextInputContainer = styled.View`
  flex: 1;
  flex-wrap: wrap;
  width: 100%;
`;

export const GroupChatBottomBarTextInput = styled.TextInput`
  border-radius: 12px;
  padding: 6px;
  font-family: "Regular";
  font-size: ${CHAT_FONT_SIZES.regular};
  min-height: 36px;
  width: 100%;
`;

export const GroupChatBottomBarKeyboardBuffer = styled.View<{ height: string }>`
  height: ${(props) => props.height};
`;
