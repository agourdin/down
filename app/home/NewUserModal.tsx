import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "../../App";
import { VALID_USER_ICONS } from "../../firebase/firestore/constants";
import { LinearGradientBackground } from "../components/global/backgrounds";
import { DefaultButton } from "../components/global/buttons";
import { IconPicker } from "../components/global/IconPicker";
import { Twemoji } from "../components/global/Twemoji";
import { useUser } from "../hooks/user";
import {
  DefaultContainer,
  FlowButtonsContainer,
  FlowContents,
  FlowFieldContainer,
} from "../styles/components/global/container.styles";
import { DefaultTextInputContainer } from "../styles/components/global/input.styles";
import {
  FieldErrors,
  FieldLabel,
  FieldSubLabel,
  ScreenTitle,
} from "../styles/components/global/text.styles";
import { colors } from "../styles/global.styles";
import { LandingScreenContainer } from "../styles/screens/screen.styles";

/**
 * @remarks
 * new user modal
 *
 * @description
 * this is where a new user will:
 * - initialize their username.
 * - initialize their icon.
 *
 * user can navigate from here to:
 * - user home screen (user/UserHomeScreen) -> by completing the form and tapping the save button
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the new user modal.
 */
export function NewUserModal({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "NewUser">): JSX.Element {
  const { uid } = route.params;

  const { name, setName, icon, setIcon, errors, handleSave } = useUser(uid);

  return (
    <LinearGradientBackground colors={[colors.darkBlue, colors.white]}>
      <LandingScreenContainer>
        <DefaultContainer justifyContent='space-between'>
          <ScreenTitle>
            welcome <Twemoji size={48} emoji={"👋"} />
          </ScreenTitle>
          <FlowContents>
            <FlowFieldContainer>
              <FieldLabel>let's get you started!</FieldLabel>
            </FlowFieldContainer>
            <FlowFieldContainer>
              <FieldLabel>first, pick a name</FieldLabel>
              <DefaultTextInputContainer
                value={name}
                placeholder='name'
                fontSize='30'
                onChangeText={(text) => {
                  setName && setName(text);
                }}
              />
              {errors.nameError ? (
                <FieldErrors>{errors.nameError}</FieldErrors>
              ) : null}
            </FlowFieldContainer>
            <FlowFieldContainer>
              <FieldLabel>then, an icon</FieldLabel>
              <IconPicker
                selected={icon}
                setIcon={setIcon}
                icons={VALID_USER_ICONS}
              />
              {errors.iconError ? (
                <FieldErrors>{errors.iconError}</FieldErrors>
              ) : null}
              <FieldSubLabel>
                (don't worry, you can change them later)
              </FieldSubLabel>
            </FlowFieldContainer>
            <FlowFieldContainer>
              <FieldLabel style={{ marginBottom: "10%" }}>
                now hit save!
              </FieldLabel>
              <Twemoji
                size={72}
                emoji={"👇"}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              />
            </FlowFieldContainer>
          </FlowContents>
          <FlowButtonsContainer>
            <DefaultButton
              title='save'
              titleColor={colors.white}
              bgColor={colors.green}
              onPress={async () => {
                await handleSave(() => navigation.pop());
              }}
            />
          </FlowButtonsContainer>
        </DefaultContainer>
      </LandingScreenContainer>
    </LinearGradientBackground>
  );
}
