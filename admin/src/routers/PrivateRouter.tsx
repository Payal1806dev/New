import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../stateManagement/reducers";
import routes, { BeforeLoginRoutes } from "../constants/routes";

interface Props {
  component: React.ComponentType;
  route: string;
}
export const PrivateRouter: React.FC<Props> = ({
  component: RouteComponent,
  route,
}) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.adminReducer);
 
  let returnData;

  if (isLoggedIn) {
    

    if (BeforeLoginRoutes.includes(route))
      returnData = <Navigate to={routes.CATEGORY_MANAGEMENT} />;
    else returnData = <RouteComponent />;
    // console.log("route: 2", route);
    
  } else {
    if (BeforeLoginRoutes.includes(route)) returnData = <RouteComponent />;
    else returnData = <Navigate to={routes.HOME} />;
  }

  return returnData;
};
