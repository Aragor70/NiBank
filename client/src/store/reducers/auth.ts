import { AuthType, Loading_Auth, Load_User, Login_Fail, Login_Success, Logout_User, Pre_Login_Fail, Pre_Login_Success, Register_Fail, Register_Success, UserType, User_Update, User_Update_Fail } from '../actions/auth/types'


export const initialState = {
    user: {
        name: null,
        email: null,
        password: null,
        accountType: null,
        avatar: null,
        role: null,
        two_factor: null,
        currency: null
    },
    preLogin: {
        email: null
    },
    loading: false,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    errors: {}
}


const auth = (state: AuthType = initialState, action: any) => {
    const { type, payload } = action;
    switch(type) {
        case Loading_Auth:
            return {...state, loading: true }
        case Load_User:
            return {...state, user: payload.user, isAuthenticated: true, loading: false }

        case Register_Success:
        case Login_Success:
            localStorage.setItem('token', payload.token);
            return {...state, user: payload.user, ...payload, isAuthenticated: true, loading: false }
        
        case Logout_User:
        case Register_Fail:
        case Login_Fail:
            localStorage.removeItem('token');
            return {...state, user: null, token: null, isAuthenticated: false, loading: false }    
        
        case User_Update:
            return { ...state, user: payload?.user, isAuthenticated: true, loading: false }
                
        case User_Update_Fail:
            return { ...state, loading: false }
        
        case Pre_Login_Success:
            return { ...state, preLogin: { email: payload.email }, loading: false }

        case Pre_Login_Fail:
            return { ...state, preLogin: null, loading: false, user: null, isAuthenticated: false }
        
        default:
            return state;
    }
}

export default auth;