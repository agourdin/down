import React from "react";
import { useNotifications } from "../../hooks/notifications";

/**
 * a wrapper for utilizing the useNotifications hook within the
 * app component tree.
 *
 * @param param `{children}`
 * @returns
 */
export const NotificationsWrapper = ({
  children,
}: React.PropsWithChildren<{}>) => {
  useNotifications();
  return <>{children}</>;
};
