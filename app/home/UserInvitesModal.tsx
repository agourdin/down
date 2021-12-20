import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "../../App";
import { FIRESTORE } from "../../firebase/firestore/constants";
import { LinearGradientBackground } from "../components/global/backgrounds";
import { DefaultButton, GreyCancelButton } from "../components/global/buttons";
import { UserInvitesInviter } from "../components/user/UserInvitesInviter";
import { useGroupInvites } from "../hooks/invite";
import {
  DefaultContainer,
  FlowButtonsContainer,
} from "../styles/components/global/container.styles";
import { FieldLabel, FlowTitle } from "../styles/components/global/text.styles";
import { colors } from "../styles/global.styles";
import { LandingScreenContainer } from "../styles/screens/screen.styles";
import { UserInvitesContainer } from "../styles/screens/user/userInvitesScreen.styles";

const INVITE_STATUSES = FIRESTORE.INVITES.STATUSES;

/**
 * @remarks
 * user invites modal
 *
 * @description
 * this is where the user can:
 * - see their group invites.
 * - accept / ignore pending invites.
 *
 * user can navigate from here to:
 * - previous screen -> by tapping the back button | by sliding the modal away.
 *
 * @param params {@link NativeStackScreenProps}.
 * @returns the user invites modal.
 */
export function UserInvitesModal({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "UserInvites">): JSX.Element {
  const { groupInvites, groupInvitesLoading, groupInvitesError } =
    useGroupInvites();

  const [viewableInvites, setViewableInvites] = React.useState<
    (JSX.Element | null)[] | undefined
  >([]);
  const [view, setView] = React.useState("pending");

  const handleInvitesView = (status: string) => {
    setView(status);
    let newViewableInvites = groupInvites?.docs.map((doc) => {
      const groupInvite = doc.data();
      const inviterId = groupInvite.invitedBy;
      const inviteStatus = groupInvite.status;
      if (status === inviteStatus || status === INVITE_STATUSES.ALL) {
        return (
          <UserInvitesInviter
            key={doc.id}
            inviterId={inviterId}
            groupId={doc.id}
            status={inviteStatus}
          />
        );
      }
      return null;
    });
    if (
      newViewableInvites &&
      newViewableInvites.filter((val) => val !== null).length < 1
    ) {
      setViewableInvites([]);
      return;
    }
    setViewableInvites(newViewableInvites);
    return;
  };

  React.useEffect(() => {
    handleInvitesView(view);
  }, [groupInvites]);

  return (
    <LinearGradientBackground colors={[colors.yellow, colors.blue]}>
      <LandingScreenContainer>
        <DefaultContainer justifyContent='space-between'>
          <FlowTitle>{view} invites</FlowTitle>

          <UserInvitesContainer
            contentContainerStyle={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}>
            {groupInvitesLoading ? (
              <FieldLabel>loading...</FieldLabel>
            ) : viewableInvites && viewableInvites.length > 0 ? (
              viewableInvites
            ) : (
              <FieldLabel>no {view} invites!</FieldLabel>
            )}
          </UserInvitesContainer>
          <FlowButtonsContainer
            direction={"row"}
            style={{ justifyContent: "space-between", alignItems: "center" }}>
            {[
              INVITE_STATUSES.PENDING,
              INVITE_STATUSES.IGNORED,
              INVITE_STATUSES.ALL,
            ].map((status) => {
              return (
                <DefaultButton
                  size='xs'
                  flex={1}
                  margin='3px'
                  key={status}
                  title={status}
                  titleColor={
                    view === status ? colors.white : colors.middleGrey
                  }
                  bgColor={view === status ? colors.yellow : colors.lightGrey}
                  onPress={() => {
                    handleInvitesView(status);
                  }}
                />
              );
            })}
          </FlowButtonsContainer>
          <FlowButtonsContainer>
            <GreyCancelButton title='back' onPress={navigation.goBack} />
          </FlowButtonsContainer>
        </DefaultContainer>
      </LandingScreenContainer>
    </LinearGradientBackground>
  );
}
