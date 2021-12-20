import { ScrollViewProps } from "react-native";
import styled from "styled-components/native";

export const GroupTopBarContainer = styled.View`
  width: 100%;
  height: 64px;
  margin-bottom: 12px;
`;

export const GroupTopBarContents = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GroupTopBarButtonContainer = styled.View`
  height: 48px;
  width: 48px;
`;

export const GroupTopBarButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const GroupTopBarNameContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-left: 6px;
  margin-right: 6px;
`;

export const GroupTopBarName = styled.Text`
  text-align: center;
  font-size: 22px;
  font-family: "Medium";
  width: 100%;
`;

export const MemberListScrollView = styled.ScrollView<ScrollViewProps>`
  width: 100%;
  max-height: 100%;
`;
