import { FirestoreError } from "@firebase/firestore";
import React from "react";
import { Animated } from "react-native";
import {
  DownStatusBackground,
  DownStatusContainer,
} from "../../styles/components/global/container.styles";
import { Twemoji } from "./Twemoji";

/**
 * returns a component that displays a user's down status. optionally acts as a button
 * for the user to change their down status.
 *
 * @param props include:
 *
 * - `down`: the down status to display.
 * - `onPress`: the function to call when pressed.
 * - `size`: the size of the component: `"xs" | "sm" | "lg"`.
 * - `button`: flag for whether the component should be used as a button or not.
 * - `loading`: flag for whether the current status is still loading.
 * - `error`: flag for if there was an error in getting the down status.
 *
 * @returns the DownStatus component.
 */
export default function DownStatus({
  down,
  onPress,
  size,
  button,
  loading,
  error,
}: {
  down: boolean | undefined;
  onPress?: () => any;
  size?: string;
  button?: boolean;
  loading?: boolean;
  error?: FirestoreError | boolean | undefined;
}) {
  const spinValue = React.useRef(new Animated.Value(0)).current;
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["-180deg", "360deg"],
  });
  const duration = 300;
  React.useEffect(() => {
    if (down) {
      Animated.timing(spinValue, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }).start();
    }
    if (!down) {
      Animated.timing(spinValue, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }).start();
    }
  });
  return (
    <DownStatusContainer
      down={down}
      size={size}
      onPress={onPress}
      disabled={!button}>
      <DownStatusBackground
        down={down}
        size={size}
        button={button}
        loading={loading}>
        <Animated.View
          style={{
            transform: [{ rotate: spin }, { perspective: 1000 }],
          }}>
          <Twemoji
            size={
              size === "xs" ? 18 : size === "sm" ? 22 : size === "lg" ? 48 : 24
            }
            emoji={error ? "❓" : "👍"}
          />
        </Animated.View>
      </DownStatusBackground>
    </DownStatusContainer>
  );
}
