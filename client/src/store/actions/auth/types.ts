export const Login_Success = 'Log_Success';
export const Login_Fail = 'Log_Fail';
export const Register_Success = 'Register_Success';
export const Register_Fail = 'Register_Fail';
export const Load_User = 'Load_User';
export const Logout_User = 'Logout_User';
export const User_Update = 'User_Update';

export type UserType = {
    name?: string | null,
    email: string | null,
    password: string | null,
    avatar?: string | null,
    role?: string | null,
    two_factor?:boolean | null
}
export type LoginUserType = {
    email: string | null,
    password: string | null
}
export type RegisterUserType = {
    name: string | null,
    email: string | null,
    password: string | null,
    passwordConfirmation: string | null
}

export type AuthType = {
    user: UserType,
    loading: true | false,
    token: string | null,
    isAuthenticated: true | false,
    errors: any
}

export type LoginUser = {
    type: typeof Login_Success,
    payload: LoginUserType
}
export type RegisterUser = {
    type: typeof Register_Success,
    payload: RegisterUserType
}
export type LoadUser = {
    type: typeof Load_User,
    payload: UserType
}
export type LoginFail = {
    type: typeof Login_Fail
}
export type RegisterFail = {
    type: typeof Login_Fail
}
export type LogoutUser = {
    type: typeof Logout_User
}


// error handler function
export type ErrorHandler = any


export type AuthDispatchTypes = LoginUser | RegisterUser | ErrorHandler | LoadUser | LoginFail | RegisterFail | LogoutUser;