import { FC } from "react";

import Loader, { LoaderPosition } from "@components/Loader";
import { ROUTS } from "@config/routs";
import { AuthStatus } from "@utils/auth";
import { Navigate } from "react-router";

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ authStatus, children }) => {
  if (authStatus === AuthStatus.unknown) {
    return <Loader position={LoaderPosition.centered} />;
  }

  if (authStatus === AuthStatus.noAuth) {
    return <Navigate to={ROUTS.NOT_FOUND} />;
  }

  return children;
};

export default PrivateRoute;
