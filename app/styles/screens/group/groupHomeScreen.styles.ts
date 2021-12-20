import { ScrollViewProps } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../global.styles";

export const GroupContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  border-radius: 24px;
  padding: 12px;
`;

export const GroupTopBarContainer = styled.View`
  width: 100%;
  height: 64px;
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
  font-size: 18px;
  font-family: "Medium";
`;
