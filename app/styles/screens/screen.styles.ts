import styled from "styled-components/native";
import { colors } from "../global.styles";

export const ScreenContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

export const LandingScreenContainer = styled(ScreenContainer)`
  padding: 24px;
`;

export const UserScreenContainer = styled(ScreenContainer)`
  margin-top: 24px;
  padding: 24px;
  height: 100%;
`;

export const GroupScreenContainer = styled(ScreenContainer)`
  margin-top: 24px;
  padding: 24px;
  height: 100%;
`;

export const GroupChatScreenContainer = styled(ScreenContainer)`
  padding: 12px 12px 0px 12px;
  height: 100%;
`;
