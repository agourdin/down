import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ScrollView, View } from "react-native";
import {
  IconButton,
  IconButtonContainer,
  IconPickerContainer,
  IconPickerGutter,
} from "../../styles/components/global/iconPicker.styles";
import { colors } from "../../styles/global.styles";
import { Twemoji } from "./Twemoji";

/**
 * returns a component for the user to select an icon.
 *
 * @param props include:
 *
 * - `selected`: the currently selected icon.
 * - `size`: (optional) `"sm"` or `"lg"`; determines the size of the icons.
 * - `setIcon`: (optional) a dispatch state action to set the icon in the parent
 * component.
 *
 * @returns the IconPicker component.
 */
export function IconPicker(props: {
  selected: string;
  icons: string[];
  size?: string;
  setIcon?: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  const [selected, setSelected] = useState(
    props.selected ? props.selected : ""
  );

  var iconRefs: any = {};
  props.icons.forEach((icon: string) => {
    iconRefs[icon] = useRef(null);
  });

  const iconPickerContainerRef = useRef<null | View>(null);
  const iconGutterRef = useRef<null | ScrollView>(null);

  // reload when the props change
  useEffect(() => {
    setSelected(props.selected);
  }, [props]);

  // scroll to selected when selected changes
  useEffect((): void => {
    scrollToIcon(
      selected,
      iconRefs[selected],
      iconPickerContainerRef,
      iconGutterRef
    );
  }, [selected]);

  return (
    <IconPickerContainer
      ref={iconPickerContainerRef}
      onLayout={() => {
        scrollToIcon(
          selected,
          iconRefs[selected],
          iconPickerContainerRef,
          iconGutterRef
        );
      }}>
      <IconPickerGutter ref={iconGutterRef} horizontal>
        {props.icons.map((icon: string) => (
          <IconButtonContainer
            ref={iconRefs[icon]}
            key={icon}
            style={{
              backgroundColor: selected === icon ? colors.white : "transparent",
            }}>
            <IconButton
              onPress={() => {
                setSelected(icon);
                if (props.setIcon) props.setIcon(icon);
              }}>
              <Twemoji
                size={props.size === "sm" ? 48 : props.size === "lg" ? 72 : 64}
                emoji={icon}
              />
            </IconButton>
          </IconButtonContainer>
        ))}
      </IconPickerGutter>
    </IconPickerContainer>
  );
}

/**
 * when called, scrolls to the user's currently selected icon in the IconPicker.
 *
 * @param selected the currently selected icon or "".
 * @param currUserIconRef the ref for the current icon.
 * @param iconPickerContainerRef the ref for the current icon's container.
 * @param iconGutterRef the ref for the icon gutter.
 */
export function scrollToIcon(
  selected: string,
  currUserIconRef: MutableRefObject<null | View>,
  iconPickerContainerRef: MutableRefObject<null | View>,
  iconGutterRef: MutableRefObject<null | ScrollView>
) {
  if (selected) {
    const currUserIconRefCurrent = currUserIconRef.current;
    currUserIconRefCurrent?.measure(
      (
        iconX: number,
        y: number,
        iconWidth: number,
        height: number,
        iconFx: number,
        fy: number
      ) => {
        iconPickerContainerRef?.current?.measure(
          (x, y, containerWidth, height, containerFx, fy) => {
            iconGutterRef.current?.scrollTo({
              x: iconX - containerWidth / 2 + iconWidth / 2,
              y: 0,
              animated: true,
            });
          }
        );
      }
    );
  } else {
    iconGutterRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: false,
    });
  }
}
