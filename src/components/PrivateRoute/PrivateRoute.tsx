import { FC } from "react";

import { ROUTS } from "@config/routs";
import { Navigate } from "react-router";

type PrivateRouteProps = {
  isAuthorized: boolean;
  children: JSX.Element;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ isAuthorized, children }) => {
  return isAuthorized ? children : <Navigate to={ROUTS.NOT_FOUND} />;
};

export default PrivateRoute;
