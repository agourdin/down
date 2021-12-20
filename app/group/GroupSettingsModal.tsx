import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { Alert } from "react-native";
import { RootStackParamList } from "../../App";
import { db } from "../../firebase/firebase";
import { VALID_GROUP_ICONS } from "../../firebase/firestore/constants";
import { handleExitGroup } from "../../firebase/firestore/groups";
import { LinearGradientBackground } from "../components/global/backgrounds";
import {
  RedCancelButton,
  DefaultButton,
  GreyCancelButton,
} from "../components/global/buttons";
import { IconPicker } from "../components/global/IconPicker";
import { useEditGroup } from "../hooks/group";
import {
  DefaultContainer,
  FlowContents,
  FlowFieldContainer,
  FlowButtonsContainer,
} from "../styles/components/global/container.styles";
import { DefaultTextInputContainer } from "../styles/components/global/input.styles";
import {
  FieldLabel,
  FlowTitle,
  ScreenTitle,
  FieldErrors,
} from "../styles/components/global/text.styles";
import { colors } from "../styles/global.styles";
import { LandingScreenContainer } from "../styles/screens/screen.styles";

/**
 * @remarks
 * group settings modal
 *
 * @description
 * this is where the user can:
 * - change the group's name.
 * - change the group's icon.
 * - leave the group.
 *
 * user can navigate from here to:
 * - previous screen -> by completing the form and tapping the save button |
 * by tapping the nevermind button | by sliding the modal away.
 * - user home screen -> by tapping the leave button and confirming the alert.
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the group settings modal.
 */
export function GroupSettingsModal({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "GroupSettings">): JSX.Element {
  const { uid, gid } = route.params;
  const [successMessage, setSuccessMessage] = React.useState("save");
  const [leaving, setLeaving] = React.useState(false);
  const {
    groupDataLoading,
    groupDataError,
    name,
    icon,
    setName,
    setIcon,
    errors,
    handleSave,
  } = useEditGroup(gid);

  const handleLeave = async () => {
    setLeaving(true);
    await handleExitGroup(db, uid, gid);
    navigation.pop();
    navigation.navigate("UserHome", { uid: uid });
  };

  return (
    <LinearGradientBackground colors={[colors.green, colors.white]}>
      <LandingScreenContainer>
        <DefaultContainer justifyContent='space-around'>
          {groupDataLoading ? (
            <FieldLabel>loading...</FieldLabel>
          ) : leaving ? (
            <FlowTitle>leaving...</FlowTitle>
          ) : groupDataError ? (
            <FieldLabel>
              ack! something went wrong. please try again later...
            </FieldLabel>
          ) : (
            <>
              <ScreenTitle>group settings</ScreenTitle>
              <FlowContents>
                <FlowFieldContainer>
                  <FieldLabel>change group name</FieldLabel>
                  <DefaultTextInputContainer
                    value={name}
                    placeholder='name'
                    onChangeText={setName}
                  />
                  {errors.nameError ? (
                    <FieldErrors>{errors.nameError}</FieldErrors>
                  ) : null}
                </FlowFieldContainer>
                <FlowFieldContainer>
                  <FieldLabel>change group icon</FieldLabel>
                  <IconPicker
                    selected={icon}
                    setIcon={setIcon}
                    icons={VALID_GROUP_ICONS}
                  />
                  {errors.iconError ? (
                    <FieldErrors>{errors.iconError}</FieldErrors>
                  ) : null}
                </FlowFieldContainer>
                <FlowFieldContainer>
                  <FieldLabel color={colors.red}>danger zone</FieldLabel>
                  <RedCancelButton
                    title='leave'
                    size='sm'
                    width='50%'
                    margin='auto'
                    onPress={async () => {
                      Alert.alert(
                        "hol' up",
                        "\nyou sure you want to leave the group?\n",
                        [
                          {
                            text: "nevermind",
                            onPress: () => {},
                            style: "cancel",
                          },
                          {
                            text: "leave",
                            onPress: async () => {
                              await handleLeave();
                            },
                          },
                        ]
                      );
                    }}
                  />
                </FlowFieldContainer>
              </FlowContents>
              <FlowButtonsContainer>
                <DefaultButton
                  title={successMessage ?? "save"}
                  titleColor={colors.white}
                  bgColor={colors.green}
                  onPress={async () => {
                    await handleSave(() => {
                      setSuccessMessage("saved!");
                      const timer = setTimeout(() => {
                        setSuccessMessage("save");
                        clearTimeout(timer);
                      }, 1500);
                    });
                  }}
                />
                <GreyCancelButton title='back' onPress={navigation.goBack} />
              </FlowButtonsContainer>
            </>
          )}
        </DefaultContainer>
      </LandingScreenContainer>
    </LinearGradientBackground>
  );
}
