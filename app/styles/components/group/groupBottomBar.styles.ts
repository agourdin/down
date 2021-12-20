import styled from "styled-components/native";

export const GroupBottomBarContainer = styled.View`
  width: 100%;
  height: 64px;
  margin-top: 12px;
`;

export const GroupBottomBarContents = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const GroupBottomBarButtonContainer = styled.View`
  height: 48px;
  width: 48px;
`;

export const GroupBottomBarButton = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const GroupBottomBarUserStatusContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-left: 6px;
  margin-right: 6px;
`;

export const GroupBottomBarUserStatus = styled.View`
  margin-left: auto;
  margin-right: auto;
`;
