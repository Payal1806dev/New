import ActionType from "../../enum";
import { IUserAuthData } from "../../interfaces/authInterface";



export const LoginAction = (data:IUserAuthData) => {
  return {
    type: ActionType.LOGIN,
    payload: data,
  };
};
export const LogoutAction = () => {
  return {
    type: ActionType.LOGOUT,
  };
};



