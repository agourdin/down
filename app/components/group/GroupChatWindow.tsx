import * as React from "react";
import { ScrollView } from "react-native";
import { db } from "../../../firebase/firebase";
import {
  Messages,
  Members,
  updateSeenBy,
  Message,
} from "../../../firebase/firestore/groups";
import { getTimeInMillis } from "../../../firebase/firestore/utils";
import {
  GroupChatWindowContainer,
  GroupChatWindowContents,
} from "../../styles/components/group/groupChatWindow.styles";
import { GroupChatReply } from "./GroupChatReply";

const CHAT_WINDOW_REFRESH_RATE = 1000;

export function GroupChatWindow({
  messages,
  members,
  uid,
  gid,
}: {
  messages: Messages;
  members: Members;
  uid: string;
  gid: string;
}): JSX.Element {
  const [refresh, setRefresh] = React.useState(false);

  const groupChatContents = React.useRef<null | ScrollView>(null);
  const scrollToEnd = () => {
    groupChatContents?.current?.scrollToEnd({
      animated: true,
    });
  };

  React.useEffect(() => {
    // update the seenby on the last message
    updateSeenBy(db, gid, uid);
    // scroll to the end of the chat window
    scrollToEnd();

    // set up render refresh
    let repeat: NodeJS.Timeout;
    const refresher = () => {
      setRefresh(!refresh);
      repeat = setTimeout(refresher, CHAT_WINDOW_REFRESH_RATE);
    };
    refresher();

    return () => {
      // clean up the refresh timer
      if (repeat) {
        clearTimeout(repeat);
      }
    };
  }, []);

  return (
    <GroupChatWindowContainer>
      <GroupChatWindowContents
        ref={groupChatContents}
        onLayout={() => scrollToEnd()}
        onContentSizeChange={() => scrollToEnd()}>
        {messages
          ? messages
              .sort((a: Message, b: Message) => {
                return (
                  getTimeInMillis(a.timestamp) - getTimeInMillis(b.timestamp)
                );
              })
              .map((message: Message) => {
                let messageUid = message.uid;
                let member = members[messageUid];
                let name = (member && member.name) || "unnamed";
                let icon = (member && member.icon) || "😶";
                let down = Boolean(member.down);
                return (
                  <GroupChatReply
                    key={message.timestamp.toMillis()}
                    uid={message.uid}
                    name={name}
                    icon={icon}
                    message={message.text}
                    timestamp={message.timestamp}
                    ownReply={uid === messageUid}
                    down={down}
                  />
                );
              })
          : null}
      </GroupChatWindowContents>
    </GroupChatWindowContainer>
  );
}
