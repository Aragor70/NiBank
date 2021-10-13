import { AuthDispatchTypes, LoadUser, Load_User, LoginUserType, Login_Fail, Login_Success, Logout_User, RegisterUserType, Register_Fail, Register_Success, User_Update } from "./types";
import { Dispatch } from 'redux';
import axios from "axios";
import { setAlert } from "../alert/";
import setAuthToken from "../../../utils/setAuthToken";

export const loadUser = () => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    
    try {
        const res: any = await axios.get('/api/auth');

        dispatch({ type: Load_User, payload: { user: res.data} });

    } catch(err: any) {
        dispatch({ type: Login_Fail });
        
    }
}


export const login = (formData: LoginUserType, history: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        const res: any = await axios.post('/api/auth', formData);
        
        dispatch({ type: Login_Success, payload: res.data })
        
        dispatch(loadUser())

        dispatch(setAlert(res.data.message, 'success'))

        history.push('/')
        
    } catch (err: any) {
        dispatch({ type: Login_Fail });
        dispatch(setAlert(err.response.data.message, 'danger'))
        
    }
}

export const register = (formData: LoginUserType, history: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        const res: any = await axios.post('/api/users', formData);
        
        console.log(res.data.message)
        dispatch({ type: Register_Success, payload: res.data })

        dispatch(loadUser())
        
        dispatch(setAlert(res.data.message, 'success'))

        history.push('/')
        
    } catch (err: any) {
        dispatch({ type: Register_Fail });
        dispatch(setAlert(err.response.data.message, 'danger'))
        
    }
}

export const logout = (history: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        dispatch({ type: Logout_User });
        history.push('/')
    } catch (err: any) {
        dispatch(setAlert('Could not log out.', 'danger'))
    }
}


export const confirm = (formData: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        
        const res: any = await axios.post('/api/users/confirm', formData);
        
        return res.data.success
        
    } catch (err: any) {
        dispatch(setAlert(err.response.data.message, 'danger'))
        
    }
}

export const update = (formData: any, setView: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        
        const res: any = await axios.put('/api/users', formData);
        
        dispatch({type: User_Update, payload: res.data})
        
        setView(false)
        
    } catch (err: any) {
        dispatch(setAlert(err.response.data.message, 'danger'))
        
    }
}