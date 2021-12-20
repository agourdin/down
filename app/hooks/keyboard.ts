import React from "react";
import { EmitterSubscription, Keyboard } from "react-native";

/**
 * hook for getting the keyboard offset number in order to move
 * components out of the way of the user's keyboard.
 *
 * @returns a keyboard offset number.
 */
export const useKeyboardOffset = () => {
  const [keyboardOffset, setKeyboardOffset] = React.useState(0);
  const onKeyboardShow = (event: { endCoordinates: { height: number } }) =>
    setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = React.useRef<EmitterSubscription>();
  const keyboardDidHideListener = React.useRef<EmitterSubscription>();

  React.useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardWillShow",
      onKeyboardShow
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardWillHide",
      onKeyboardHide
    );

    return () => {
      keyboardDidShowListener?.current?.remove();
      keyboardDidHideListener?.current?.remove();
    };
  }, []);

  return {
    keyboardOffset,
  };
};
