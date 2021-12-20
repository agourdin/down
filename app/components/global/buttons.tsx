import React from "react";
import { ButtonProps } from "react-native";
import {
  DefaultButtonContainer,
  DefaultButtonText,
} from "../../styles/components/global/button.styles";
import {
  NotificationsTagContainer,
  NotificationsTagContents,
} from "../../styles/components/global/text.styles";
import { colors } from "../../styles/global.styles";

export const DefaultButton = ({
  onPress,
  bgColor,
  titleColor,
  title,
  size,
  width,
  tight,
  margin,
  flex,
  notifications,
}: ButtonProps & {
  bgColor: string;
  titleColor: string;
  size?: string;
  width?: string;
  tight?: boolean;
  flex?: string | number;
  margin?: string;
  notifications?: boolean;
}) => (
  <DefaultButtonContainer
    onPress={onPress}
    bgColor={bgColor}
    titleColor={titleColor}
    size={size}
    width={width}
    tight={tight}
    margin={margin}
    flex={flex}>
    {notifications ? (
      <NotificationsTagContainer>
        <NotificationsTagContents>
          {typeof notifications === "string" ? notifications : ""}
        </NotificationsTagContents>
      </NotificationsTagContainer>
    ) : null}
    <DefaultButtonText titleColor={titleColor} size={size}>
      {title}
    </DefaultButtonText>
  </DefaultButtonContainer>
);

export type CancelButtonProps = {
  size?: string;
  width?: string;
  tight?: boolean;
  margin?: string;
};

export const GreyCancelButton = ({
  onPress,
  title,
  size,
  width,
  tight,
  margin,
}: ButtonProps & CancelButtonProps) => (
  <DefaultButtonContainer
    onPress={onPress}
    bgColor={colors.lightGrey}
    titleColor={colors.middleGrey}
    size={size}
    width={width}
    tight={tight}
    margin={margin}>
    <DefaultButtonText titleColor={colors.middleGrey} size={size}>
      {title}
    </DefaultButtonText>
  </DefaultButtonContainer>
);

export const RedCancelButton = ({
  onPress,
  title,
  size,
  width,
  tight,
  margin,
}: ButtonProps & CancelButtonProps) => (
  <DefaultButtonContainer
    onPress={onPress}
    bgColor={colors.red}
    titleColor={colors.white}
    size={size}
    width={width}
    tight={tight}
    margin={margin}>
    <DefaultButtonText titleColor={colors.white} size={size}>
      {title}
    </DefaultButtonText>
  </DefaultButtonContainer>
);

export const YellowCautionButton = ({
  onPress,
  title,
  size,
  width,
  tight,
  margin,
}: ButtonProps & CancelButtonProps) => (
  <DefaultButtonContainer
    onPress={onPress}
    bgColor={colors.yellow}
    titleColor={colors.white}
    size={size}
    width={width}
    tight={tight}
    margin={margin}>
    <DefaultButtonText titleColor={colors.white} size={size}>
      {title}
    </DefaultButtonText>
  </DefaultButtonContainer>
);

export const GreenAcceptButton = ({
  onPress,
  title,
  size,
  width,
  tight,
  margin,
}: ButtonProps & CancelButtonProps) => (
  <DefaultButtonContainer
    onPress={onPress}
    bgColor={colors.green}
    titleColor={colors.white}
    size={size}
    width={width}
    tight={tight}
    margin={margin}>
    <DefaultButtonText titleColor={colors.white} size={size}>
      {title}
    </DefaultButtonText>
  </DefaultButtonContainer>
);

export const RoundInviteButton = ({
  onPress,
  size,
  margin,
}: ButtonProps & {
  size?: string;
  margin?: string;
}) => (
  <DefaultButtonContainer
    onPress={onPress}
    bgColor={colors.yellow}
    titleColor={colors.white}
    size={size}
    margin={margin}>
    <DefaultButtonText titleColor={colors.white} size={"size"}>
      +
    </DefaultButtonText>
  </DefaultButtonContainer>
);
