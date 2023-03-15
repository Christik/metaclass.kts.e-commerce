import { FC } from "react";

import { ROUTS } from "@config/routs";
import { AuthStatus } from "@utils/auth";
import { Navigate } from "react-router";

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ authStatus, children }) => {
  return authStatus === AuthStatus.auth ? (
    children
  ) : (
    <Navigate to={ROUTS.NOT_FOUND} />
  );
};

export default PrivateRoute;
