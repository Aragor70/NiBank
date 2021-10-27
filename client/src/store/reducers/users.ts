import { AuthType, Load_User, Load_Users_Fail, Load_Users_Success, Login_Fail, Login_Success, Logout_User, Register_Fail, Register_Success, UserType, User_Update } from '../actions/auth/types'


export const initialState = {
    users: [],
    loading: true,
    errors: {}
}


const auth = (state: any = initialState, action: any) => {
    const { type, payload } = action;
    switch(type) {
        
        case Load_Users_Success:
            return {...state, users: payload.users || [], loading: false }

        case Load_Users_Fail:
            return {...state, users: [], loading: false }    
        
        default:
            return state;
    }
}

export default auth;