import React from "react";
import { Animated } from "react-native";
import { useGroupInvites } from "../../hooks/invite";
import {
  FieldLabel,
  FieldSubLabel,
} from "../../styles/components/global/text.styles";
import {
  NoGroupsContainer,
  NoGroupsContents,
} from "../../styles/components/user/noGroups.styles";
import { Twemoji } from "../global/Twemoji";

const ANIMATION_DURATION = 500;

export function NoGroups() {
  const { hasPendingInvites } = useGroupInvites();
  const pointer1Value = React.useRef(new Animated.Value(10)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pointer1Value, {
          toValue: 25,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(pointer1Value, {
          toValue: 10,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const duration = 300;
  if (hasPendingInvites)
    return (
      <NoGroupsContainer>
        <NoGroupsContents style={{ width: "100%", alignItems: "flex-end" }}>
          <Twemoji size={72} emoji='😍' />
          <AnimatedPointer2 />
        </NoGroupsContents>
        <NoGroupsContents>
          <FieldLabel>you have an invite!</FieldLabel>
        </NoGroupsContents>
        <NoGroupsContents></NoGroupsContents>
        <NoGroupsContents>
          <FieldLabel>or...</FieldLabel>
        </NoGroupsContents>
        <NoGroupsContents></NoGroupsContents>
        <NoGroupsContents>
          <FieldLabel>you could start your own group</FieldLabel>
        </NoGroupsContents>
        <NoGroupsContents>
          <Animated.View style={{ transform: [{ translateY: pointer1Value }] }}>
            <Twemoji size={64} emoji='👇' />
          </Animated.View>
          <Twemoji size={72} emoji='😎' />
        </NoGroupsContents>
      </NoGroupsContainer>
    );
  return (
    <NoGroupsContainer>
      <NoGroupsContents>
        <FieldLabel>nothing to see here...</FieldLabel>
      </NoGroupsContents>
      <NoGroupsContents>
        <FieldLabel>why not start a new group?</FieldLabel>
      </NoGroupsContents>
      <NoGroupsContents>
        <Animated.View style={{ transform: [{ translateY: pointer1Value }] }}>
          <Twemoji size={64} emoji='👇' />
        </Animated.View>
        <Twemoji size={72} emoji='😎' />
      </NoGroupsContents>
    </NoGroupsContainer>
  );
}

const AnimatedPointer2 = () => {
  const pointer2Value = React.useRef(
    new Animated.ValueXY({ x: 10, y: -10 })
  ).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pointer2Value, {
          toValue: { x: 15, y: -25 },
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(pointer2Value, {
          toValue: { x: 10, y: -10 },
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  return (
    <Animated.View
      style={{
        transform: [
          { translateX: pointer2Value.x },
          { translateY: pointer2Value.y },
        ],
      }}>
      <Twemoji
        size={64}
        emoji='👆'
        style={{ transform: [{ rotate: "30deg" }] }}
      />
    </Animated.View>
  );
};
