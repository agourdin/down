import React from "react";
import {
  PressableIconBackground,
  PressableIconContainer,
} from "../../styles/components/global/container.styles";
import { Twemoji } from "./Twemoji";

/**
 * returns a pressable icon button.
 *
 * @param props include:
 *
 * - `onPress`: the function to call when pressed.
 * - `icon`: the icon to display.
 * - `size`: the size of the icon: `"sm" | "m" | "lg"`.
 * - `shadow`: flag for whether the component should show a button shadow or not.
 * - `notifications`: flag for whether the icon should show notifications badge.
 *
 * @returns the PressableIcon component.
 */
export default function PressableIcon({
  onPress,
  icon,
  size,
  shadow,
  notifications,
}: {
  onPress?: () => any;
  icon: string;
  size?: string;
  shadow?: boolean;
  notifications?: boolean;
}) {
  return (
    <PressableIconContainer size={size} onPress={onPress}>
      <PressableIconBackground size={size} shadow={shadow}>
        <Twemoji
          size={
            size === "sm" ? 22 : size === "m" ? 36 : size === "lg" ? 48 : 24
          }
          emoji={icon}
          notifications={notifications}
        />
      </PressableIconBackground>
    </PressableIconContainer>
  );
}
