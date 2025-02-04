import ActionType from "../../enum";
import { IUser } from "../../interfaces/authInterface";



interface IRootState {
 
  isLoggedIn: boolean;
  first_name:string;
  last_name:string;
  email:string;
  token:string;

}

const initialState: IRootState = {
  
  isLoggedIn: false,
  first_name:'',
  last_name:'',
  email:'',
  token:'',
 
};


interface IAuthLoginAction {
  type: ActionType.LOGIN;
  payload: IUser;
}

interface IAuthLogoutAction {
  type: ActionType.LOGOUT;
}


type Action = IAuthLoginAction | IAuthLogoutAction;

export const adminReducer = (state = initialState, action: Action) => {
  console.log('Action received:', action);
  switch (action.type) {
    case ActionType.LOGIN:
      console.log('Login action payload:', action.payload);
      return {
  
       ...state,
        isLoggedIn: true,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        email: action.payload.email,
        token: action.payload.token,
    
      };
      
    case ActionType.LOGOUT:
      console.log('Logout action');
      return initialState;
     
    
    default:
      
      return state;
  }
};
