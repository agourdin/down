import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { Animated, Text } from "react-native";
import { RootStackParamList } from "../../../App";
import { useKeyboardOffset } from "../../hooks/keyboard";
import {
  GroupChatBottomBarContainer,
  GroupChatBottomBarContents,
  GroupChatBottomBarErrors,
  GroupChatBottomBarIconContents,
  GroupChatBottomBarKeyboardBuffer,
  GroupChatBottomBarSendIconContainer,
  GroupChatBottomBarTextInput,
  GroupChatBottomBarTextInputContainer,
  GroupChatBottomBarUserIconContainer,
} from "../../styles/components/group/groupChatBottomBar.styles";
import { colors } from "../../styles/global.styles";
import { Twemoji } from "../global/Twemoji";

export function GroupChatBottomBar({
  uid,
  icon,
  text,
  setText,
  handleSubmit,
  errors,
  navigation,
}: {
  uid: string;
  icon: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
  errors: string;
  navigation: NativeStackNavigationProp<RootStackParamList, "GroupChat">;
}): JSX.Element {
  const [messageHeight, setMessageHeight] = React.useState<number | undefined>(
    undefined
  );
  const { keyboardOffset } = useKeyboardOffset();

  return (
    <GroupChatBottomBarContainer>
      <GroupChatBottomBarKeyboardBuffer height={keyboardOffset - 24 + "px"} />
      <KeyboardBuffer
        scaleY={-keyboardOffset + 24}
        style={{ backgroundColor: colors.white, paddingTop: 6 }}>
        {errors ? (
          <GroupChatBottomBarErrors>{errors}</GroupChatBottomBarErrors>
        ) : (
          <></>
        )}
        <GroupChatBottomBarContents
          style={{ marginBottom: keyboardOffset ? 0 : 24 }}>
          <GroupChatBottomBarUserIconContainer
            onPress={() => navigation.navigate("UserSettings", { uid: uid })}>
            <GroupChatBottomBarIconContents>
              <Twemoji size={20} emoji={icon ?? "😶"} />
            </GroupChatBottomBarIconContents>
          </GroupChatBottomBarUserIconContainer>
          <GroupChatBottomBarTextInputContainer>
            <GroupChatBottomBarTextInput
              value={text}
              onChangeText={setText}
              placeholder='type message...'
              textAlignVertical='top'
              onContentSizeChange={(e) => {
                setMessageHeight(e.nativeEvent.contentSize.height);
              }}
              style={{ height: messageHeight }}
              multiline
            />
          </GroupChatBottomBarTextInputContainer>
          <GroupChatBottomBarSendIconContainer onPress={() => handleSubmit()}>
            <GroupChatBottomBarIconContents>
              <Twemoji size={18} emoji='📨' />
            </GroupChatBottomBarIconContents>
          </GroupChatBottomBarSendIconContainer>
        </GroupChatBottomBarContents>
      </KeyboardBuffer>
    </GroupChatBottomBarContainer>
  );
}

const KeyboardBuffer = (props: {
  scaleY: number;
  style?: any;
  children?: JSX.Element | JSX.Element[] | null;
}) => {
  const moveAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(moveAnim, {
      toValue: props.scaleY,
      useNativeDriver: true,
      duration: 250,
    }).start();
  }, [moveAnim, props.scaleY]);

  return (
    <Animated.View
      style={{ ...props.style, transform: [{ translateY: moveAnim }] }}>
      {props.children}
    </Animated.View>
  );
};
