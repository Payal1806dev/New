export interface IUserRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
  isAdmin?: boolean;
  role?: string;
}
export interface IGoogleCredentials {
  token: string;
}
