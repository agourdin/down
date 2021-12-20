import styled from "styled-components/native";
import { colors } from "../../global.styles";
import { CHAT_FONT_SIZES } from "./constants";

export const GroupChatWindowContainer = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
`;

export const GroupChatWindowContents = styled.ScrollView`
  flex: 1;
  height: 100%;
  width: 100%;
  border-radius: 12px;
`;

type GroupChatReplyProps = {
  ownReply: boolean;
  down?: boolean;
};

export const GroupChatReplyContainer = styled.View<GroupChatReplyProps>`
  max-height: 100%;
  width: 100%;
  margin-top: 9px;
  margin-bottom: 9px;
  padding: 12px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.ownReply ? colors.blue : props.down ? colors.green : colors.red};
`;

export const GroupChatReplyContents = styled.View`
  flex-direction: column;
  justify-content: space-between;
`;

export const GroupChatReplyNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

export const GroupChatReplyIconContainer = styled.View<GroupChatReplyProps>`
  width: 18px;
  ${(props) => (props.ownReply ? "margin-left: 9px" : "margin-right: 9px")}
`;

export const GroupChatReplyIconContents = styled.View`
  align-items: center;
  justify-content: center;
`;

export const GroupChatReplyNameContents = styled.View<GroupChatReplyProps>`
  margin-left: ${(props) => (props.ownReply ? "6px" : "0px")};
  margin-right: ${(props) => (props.ownReply ? "0px" : "6px")};
  align-items: flex-start;
  justify-content: flex-start;
`;

export const GroupChatReplyName = styled.Text`
  color: ${colors.white};
  font-family: "Medium";
  font-size: ${CHAT_FONT_SIZES.regular};
`;

export const GroupChatReplyTimestamp = styled.Text<GroupChatReplyProps>`
  color: ${colors.white};
  margin-right: ${(props) => (props.ownReply ? "auto" : "0")};
  margin-left: ${(props) => (props.ownReply ? "0" : "auto")};
  font-family: "Regular";
  font-size: 10px;
  align-self: flex-start;
`;

export const GroupChatReplyMessageContainer = styled.View`
  flex-wrap: wrap;
`;

export const GroupChatReplyMessage = styled.Text<GroupChatReplyProps>`
  ${(props) => (props.ownReply ? `text-align: right;` : "")};
  color: ${colors.white};
  font-family: "Regular";
  font-size: ${CHAT_FONT_SIZES.regular};
  width: 100%;
`;
