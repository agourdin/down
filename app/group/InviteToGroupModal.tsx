import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "../../App";
import { LinearGradientBackground } from "../components/global/backgrounds";
import { DefaultButton, GreyCancelButton } from "../components/global/buttons";
import { Twemoji } from "../components/global/Twemoji";
import { useInvite } from "../hooks/invite";
import {
  DefaultContainer,
  FlowFieldContainer,
  FlowButtonsContainer,
} from "../styles/components/global/container.styles";
import { DefaultTextInputContainer } from "../styles/components/global/input.styles";
import {
  FlowTitle,
  FieldLabel,
  FieldErrors,
  FieldSubLabel,
} from "../styles/components/global/text.styles";
import { colors } from "../styles/global.styles";
import { LandingScreenContainer } from "../styles/screens/screen.styles";

/**
 * @remarks
 * invite to group modal
 *
 * @description
 * this is where the user can invite someone to join a group by submitting an email.
 *
 * user can navigate from here to:
 * - group home screen (group/GroupHomeScreen) -> by tapping the nevermind button | by sliding the modal away.
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the invite to group modal.
 */
export function InviteToGroupModal({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "InviteToGroup">): JSX.Element {
  const { gid, uid } = route.params;
  const { email, setEmail, errors, success, handleSubmit } = useInvite({
    gid,
    uid,
  });
  return (
    <LinearGradientBackground colors={[colors.yellow, colors.orange]}>
      <LandingScreenContainer>
        <DefaultContainer justifyContent='space-around'>
          <FlowTitle>
            want to <Twemoji size={36} emoji={"🐛"} /> a friend to join your
            group?
          </FlowTitle>
          <FlowFieldContainer>
            <FieldLabel>just enter their email:</FieldLabel>
            <DefaultTextInputContainer
              value={email.toLowerCase()}
              keyboardType='email-address'
              placeholder='enter an email'
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />
            {errors ? <FieldErrors>{errors}</FieldErrors> : null}
            {success ? <FieldSubLabel>{success}</FieldSubLabel> : null}
          </FlowFieldContainer>
          <FlowButtonsContainer>
            <DefaultButton
              title='send'
              titleColor={colors.white}
              bgColor={colors.yellow}
              onPress={handleSubmit}
            />
            <GreyCancelButton
              title='back'
              onPress={() => navigation.goBack()}
            />
          </FlowButtonsContainer>
        </DefaultContainer>
      </LandingScreenContainer>
    </LinearGradientBackground>
  );
}
