import styled from "styled-components/native";
import { BUTTON_SHADOW_STYLES, colors } from "../../global.styles";

export const IconPickerContainer = styled.View`
  width: 100%;
  height: 96px;
`;

export const IconPickerGutter = styled.ScrollView`
  flex: 1;
  flex-direction: row;
`;

type IconButtonContainerProps = {
  size?: string;
};

export const IconButtonContainer = styled.View<IconButtonContainerProps>`
  font-size: ${(props) =>
    props.size === "sm" ? "22px" : props.size === "lg" ? "48px" : "24px"};
  border-radius: 10000px;
  padding: 12px;
  margin: 3px;
  ${BUTTON_SHADOW_STYLES}
`;

export const IconButton = styled.TouchableOpacity``;
