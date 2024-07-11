import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../stateManagement/reducers';
import routes, { BeforeLoginRoutes } from '../constatnts/routes';



interface Props {
    component: React.ComponentType;
    route: string;
  }
export const PrivateRouter : React.FC<Props> = ({
    component: RouteComponent,
    route,
  }) => {
   

  
    const { isLoggedIn } = useSelector((state: RootState) => state.authReducer );

    let returnData;
   

    if (isLoggedIn) {
    
      if (BeforeLoginRoutes.includes(route)){

        returnData = <Navigate to={routes.DASHBOARD} />;
      }else returnData = <RouteComponent />;
      console.log(returnData);
    } else {
      console.log(returnData);
      if (BeforeLoginRoutes.includes(route)) returnData = <RouteComponent />;
      else returnData = <Navigate to={routes.LOGIN} />;
    }
  
    return returnData;

  };


