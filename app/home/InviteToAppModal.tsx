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
  FieldDescription,
  FieldErrors,
  FieldSubLabel,
} from "../styles/components/global/text.styles";
import { colors } from "../styles/global.styles";
import { LandingScreenContainer } from "../styles/screens/screen.styles";

/**
 * @remarks
 * invite to app modal
 *
 * @description
 * modal where the user can invite someone to join the app by submitting an email.
 *
 * user can navigate from here to:
 * - user home screen (user/UserHomeScreen) -> by completing the form and tapping the save button |
 * by tapping the nevermind button | by sliding the modal away.
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the invite to app modal.
 */
export function InviteToAppModal({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "InviteToApp">): JSX.Element {
  const { email, setEmail, errors, success, handleSubmit } = useInvite();

  return (
    <LinearGradientBackground colors={[colors.yellow, colors.orange]}>
      <LandingScreenContainer>
        <DefaultContainer justifyContent='space-around'>
          <FlowTitle>
            want to <Twemoji size={36} emoji={"🐛"} /> a friend to join down?
          </FlowTitle>
          <FlowFieldContainer>
            <FieldLabel>just enter their email:</FieldLabel>
            <FieldDescription></FieldDescription>
            <DefaultTextInputContainer
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
              placeholder='enter email'
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
