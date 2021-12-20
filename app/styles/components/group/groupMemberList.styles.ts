import { ScrollViewProps } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../global.styles";

export const GroupMemberListContainer = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
`;

export const GroupMemberListContents = styled.ScrollView`
  flex: 1;
  width: 100%;
  border-radius: 24px;
`;

export const GroupMemberContainer = styled.View`
  min-height: 48px;
  width: 100%;
  margin-top: 6px;
  margin-bottom: 6px;
`;

export const GroupMemberContents = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GroupMemberStatusContainer = styled.View`
  width: 48px;
  height: 48px;
`;
export const GroupMemberStatusContents = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const GroupMemberIconContainer = styled.View`
  width: 48px;
  height: 48px;
`;
export const GroupMemberIconContents = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const GroupMemberNameContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-left: 6px;
  margin-right: 6px;
`;

export const GroupMemberName = styled.Text<{ down?: boolean }>`
  text-align: center;
  font-size: 18px;
  font-family: "Medium";
  width: 100%;
  color: ${(props) => (props.down ? colors.green : colors.red)};
`;

export const MemberListScrollView = styled.ScrollView<ScrollViewProps>`
  width: 100%;
  max-height: 100%;
`;
