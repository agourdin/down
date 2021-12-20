import { Timestamp } from "@firebase/firestore";
import * as React from "react";
import {
  getTimeInMillis,
  convertMillisToTimeAgo,
} from "../../../firebase/firestore/utils";
import {
  GroupChatReplyContainer,
  GroupChatReplyContents,
  GroupChatReplyIconContainer,
  GroupChatReplyIconContents,
  GroupChatReplyMessage,
  GroupChatReplyMessageContainer,
  GroupChatReplyName,
  GroupChatReplyNameContainer,
  GroupChatReplyNameContents,
  GroupChatReplyTimestamp,
} from "../../styles/components/group/groupChatWindow.styles";
import { Twemoji } from "../global/Twemoji";

export function GroupChatReply({
  uid,
  name,
  icon,
  message,
  timestamp,
  ownReply,
  down,
}: {
  uid: string;
  name: string;
  icon: string;
  message: string;
  timestamp: Timestamp;
  ownReply: boolean;
  down: boolean;
}): JSX.Element {
  const time = getTimeInMillis(timestamp);
  const now = getTimeInMillis(Timestamp.now());
  const timeAgoString = convertMillisToTimeAgo(now - time);

  return (
    <GroupChatReplyContainer ownReply={ownReply} down={down}>
      <GroupChatReplyContents>
        <GroupChatReplyNameContainer>
          {!ownReply ? (
            <>
              <GroupChatReplyIconContainer ownReply={ownReply}>
                <GroupChatReplyIconContents>
                  <Twemoji size={18} emoji={icon} />
                </GroupChatReplyIconContents>
              </GroupChatReplyIconContainer>
              <GroupChatReplyNameContents ownReply={ownReply}>
                <GroupChatReplyName>{name}</GroupChatReplyName>
              </GroupChatReplyNameContents>
              <GroupChatReplyTimestamp ownReply={ownReply}>
                {timeAgoString}
              </GroupChatReplyTimestamp>
            </>
          ) : (
            <>
              <GroupChatReplyTimestamp ownReply={ownReply}>
                {timeAgoString}
              </GroupChatReplyTimestamp>
              <GroupChatReplyNameContents ownReply={ownReply}>
                <GroupChatReplyName>{name}</GroupChatReplyName>
              </GroupChatReplyNameContents>
              <GroupChatReplyIconContainer ownReply={ownReply}>
                <GroupChatReplyIconContents>
                  <Twemoji size={18} emoji={icon} />
                </GroupChatReplyIconContents>
              </GroupChatReplyIconContainer>
            </>
          )}
        </GroupChatReplyNameContainer>
        <GroupChatReplyMessageContainer>
          <GroupChatReplyMessage ownReply={ownReply}>
            {message}
          </GroupChatReplyMessage>
        </GroupChatReplyMessageContainer>
      </GroupChatReplyContents>
    </GroupChatReplyContainer>
  );
}
