export interface User{
    name: string;
    email: string;
    _id: number;
}
export interface LoginSuccessState{
    token: string;
    user: User;
}

export interface LoginState {
    email: string;
    password: string;
}

export interface UserRegistration {
    name: string,
    email: string,
    password: string,
    age: number
}

export interface LoginInterfaceState {
    user: IUserState;
    login: LoginState;
    registration: UserRegistration;
}

export type IUserState = LoginSuccessState;