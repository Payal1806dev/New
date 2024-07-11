// export interface ILoginData{
//     email: string,
//     password: string
// }

export interface IUser {
    id: number;
    first_name: string;
    last_name:string;
    email: string;
    isAdmin: boolean;
    token: string;
}


export interface ICategory{
    id: string;
    name: string;
}