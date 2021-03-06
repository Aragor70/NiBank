export const Login_Success = 'Log_Success';
export const Login_Fail = 'Log_Fail';
export const Register_Success = 'Register_Success';
export const Register_Fail = 'Register_Fail';
export const Load_User = 'Load_User';
export const Logout_User = 'Logout_User';
export const User_Update = 'User_Update';
export const Load_Users_Success = 'Load_Users_Success';
export const Load_Users_Fail = 'Load_Users_Fail';
export const Pre_Login_Success = 'Pre_Login_Success';
export const Pre_Login_Fail = 'Pre_Login_Fail';
export const Pre_Register_Success = 'Pre_Register_Success';
export const Pre_Register_Fail = 'Pre_Register_Fail';
export const Create_Wallet_Success = 'Create_Wallet_Success';
export const Create_Wallet_Fail = 'Create_Wallet_Fail';
export const Loading_Auth = 'Loading_Auth';
export const User_Update_Fail = 'User_Update_Fail';

export type UserType = {
    name?: string | null,
    email: string | null,
    password: string | null,
    accountType: string | null,
    avatar?: string | null,
    role?: string | null,
    two_factor?:boolean | null
}
export type LoginUserType = {
    email: string | null,
    password: string | null,
    emailSave?: boolean | null
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