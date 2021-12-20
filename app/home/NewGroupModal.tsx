import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { addDoc, arrayUnion, collection, setDoc } from "firebase/firestore";
import * as React from "react";
import { RootStackParamList } from "../../App";
import { db } from "../../firebase/firebase";
import {
  FIRESTORE,
  VALID_GROUP_ICONS,
} from "../../firebase/firestore/constants";
import { NewGroup, newMember } from "../../firebase/firestore/groups";
import { getPrivateDataDocRef } from "../../firebase/firestore/users";
import { LinearGradientBackground } from "../components/global/backgrounds";
import { DefaultButton, GreyCancelButton } from "../components/global/buttons";
import { IconPicker } from "../components/global/IconPicker";
import { useNameAndIcon } from "../hooks/global";
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
 * new group modal
 *
 * @description
 * this is where the user can create a new group.
 *
 * user can navigate from here to:
 * - user home screen (user/UserHomeScreen) -> by completing the form and tapping the save button |
 * by tapping the nevermind button | by sliding the modal away.
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the new group modal.
 */
export function NewGroupModal({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "NewGroup">): JSX.Element {
  const { uid } = route.params;
  const [loading, setLoading] = React.useState(false);
  const { name, icon, setName, setIcon, errors, validateNameAndIcon } =
    useNameAndIcon();

  const handleCreateNewGroup = async () => {
    setLoading(true);
    const data: NewGroup = {
      name: name,
      icon: icon,
      members: {
        [uid]: newMember(),
      },
    };
    if (validateNameAndIcon()) {
      let gid = (await addDoc(collection(db, FIRESTORE.PATHS.GROUPS), data)).id;
      await setDoc(
        getPrivateDataDocRef(db, uid),
        { groups: arrayUnion(gid) },
        { merge: true }
      );
      navigation.pop();
      navigation.navigate("GroupHome", { uid: uid, gid: gid });
    }
  };

  return (
    <LinearGradientBackground colors={[colors.green, colors.white]}>
      <LandingScreenContainer>
        <DefaultContainer justifyContent='space-between'>
          <ScreenTitle>new group</ScreenTitle>
          <FlowContents>
            <FlowFieldContainer>
              <FieldLabel>choose a group name</FieldLabel>
              <DefaultTextInputContainer
                value={name}
                placeholder='group name'
                onChangeText={setName}
              />
              {errors.nameError ? (
                <FieldErrors>{errors.nameError}</FieldErrors>
              ) : null}
            </FlowFieldContainer>
            <FlowFieldContainer>
              <FieldLabel>choose a group icon</FieldLabel>
              <IconPicker
                selected={icon}
                setIcon={setIcon}
                icons={VALID_GROUP_ICONS}
              />
              {errors.iconError ? (
                <FieldErrors>{errors.iconError}</FieldErrors>
              ) : null}
              <FieldSubLabel>
                (don't worry, you can change them later)
              </FieldSubLabel>
            </FlowFieldContainer>
          </FlowContents>
          <FlowButtonsContainer>
            <DefaultButton
              title={loading ? "creating..." : "let's go"}
              titleColor={colors.white}
              bgColor={colors.green}
              onPress={async () =>
                loading ? () => {} : await handleCreateNewGroup()
              }
            />
            <GreyCancelButton
              title='nevermind'
              onPress={() => navigation.pop()}
            />
          </FlowButtonsContainer>
        </DefaultContainer>
      </LandingScreenContainer>
    </LinearGradientBackground>
  );
}
