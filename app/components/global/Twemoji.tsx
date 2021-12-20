import * as React from "react";
import { Image, Text, View } from "react-native";
import twemoji from "twemoji";
import { ALL_VALID_ICONS } from "../../../firebase/firestore/constants";
import {
  NotificationsTagContainer,
  NotificationsTagContents,
} from "../../styles/components/global/text.styles";

/**
 * creates a twemoji image from a given emoji with a specified size.
 *
 * @param props
 * @returns
 */
export const Twemoji = (
  props: React.PropsWithChildren<{
    emoji: string;
    size: string | number;
    style?: {};
    notifications?: number | boolean;
  }>
) => {
  const twemojiStyle = props.style ?? {};
  const imageStyle = {
    width: props.size,
    height: props.size,
  };
  const textStyle = {
    ...imageStyle,
    ...twemojiStyle,
  };

  if (ALL_VALID_ICONS.indexOf(props.emoji) < 0) {
    return <Text style={textStyle}>{props.emoji}</Text>;
  }
  const uri = twemoji.parse(props.emoji).split(`src=\"`)[1].split(`\"`)[0];
  return (
    <View style={textStyle}>
      {props.notifications ? (
        <NotificationsTagContainer>
          <NotificationsTagContents>
            {typeof props.notifications === "string" ? props.notifications : ""}
          </NotificationsTagContents>
        </NotificationsTagContainer>
      ) : null}
      <Image testID={props.emoji} style={imageStyle} source={{ uri: uri }} />
    </View>
  );
};
