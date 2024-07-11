import ActionType from "../../enum";
import { IUser } from "../../interfaces/authInterface";



export const LoginAction = (data:IUser) => {
  console.log("Dispatching login action with payload:", data);
  return {
    type: ActionType.LOGIN,
    payload: data,
  };
  console.log("Action--->>>>>>", data)
};
export const LogoutAction = () => {
  return {
    type: ActionType.LOGOUT,
  };
};
// stateManagement/actions/adminAction.ts
// import axios from 'axios';
// import ActionType from '../../enum';

// export const loginAction = (loginData: { email: string, password: string, isAdmin: boolean }) => async (dispatch: any) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:5000/api/admin/admin-login",
//       loginData
//     );

//     if (response.data) {
//      return{
//         type: ActionType.LOGIN,
//         payload: response.data
//       };
//     } else {
//       dispatch({
//         type: 'LOGIN_FAILURE',
//         payload: 'Invalid credentials'
//       });
//     }
//   } catch (error: any) {
//     console.error("Login error:", error);
//     dispatch({
//       type: 'LOGIN_FAILURE',
//       payload: 'Failed to log in'
//     });
//   }
// };
// export const LogoutAction = () => {
//     return {
//       type: ActionType.LOGOUT,
//     };
//   };