import { AuthDispatchTypes, LoadUser, Load_User, LoginUserType, Login_Fail, Load_Users_Success, Load_Users_Fail, Login_Success, Logout_User, Pre_Login_Success, Register_Fail, Register_Success, User_Update, Pre_Login_Fail, RegisterUserType, Pre_Register_Success, Pre_Register_Fail, Loading_Auth, User_Update_Fail, Create_Wallet_Success, Create_Wallet_Fail } from "./types";
import { Dispatch } from 'redux';
import axios from "axios";
import { setAlert } from "../alert/";
import setAuthToken from "../../../utils/setAuthToken";
import { URL } from "../../../utils/constants";
import { RouteComponentProps } from "react-router";

export const loadUser = () => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    
    try {
        dispatch({ type: Loading_Auth })
        const res: any = await axios.get(URL + '/api/auth');

        dispatch({ type: Load_User, payload: { user: res.data} });

    } catch(err: any) {
        dispatch({ type: Login_Fail });
        
    }
}
export const loadUsers = () => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        const res: any = await axios.get(URL + '/api/users');
        console.log(res)
        dispatch({ type: Load_Users_Success, payload: { users: res.data} });

    } catch(err: any) {
        dispatch({ type: Load_Users_Fail });
        
    }
}


export const login = (formData: LoginUserType, history: any, present: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        dispatch({ type: Loading_Auth })
        const res: any = await axios.post(URL + '/api/auth', formData);
        
        dispatch({ type: Login_Success, payload: res.data })
        
        dispatch(loadUser())

        dispatch(setAlert(res.data.message, 'success'))

        if (formData?.emailSave) {
            localStorage.setItem('email', formData?.email || '')
        } else if (!formData?.emailSave && localStorage?.email) {
            localStorage.removeItem('email');
        }

        history.push('/')
        
    } catch (err: any) {
        dispatch({ type: Login_Fail });
        dispatch(setAlert(err.response.data.message, 'danger'))

        present({
            cssClass: 'error-message',
            header: 'Error message',
            message: err?.response?.data?.message || err?.message,
            buttons: [
              { text: 'CLOSE', handler: () => console.log('ok pressed') },
            ],
            onDidDismiss: () => console.log('did dismiss')
        });
        
    }
}
export const preLogin = (formData: LoginUserType, present: any, setStep: any) => async(dispatch: Dispatch<any>) => {
    try {

        const res: any = await axios.post(URL + '/api/auth/pre-login', formData);
        
        await setStep(2)
        dispatch({ type: Pre_Login_Success, payload: res.data })
        
    } catch (err: any) {
        dispatch({ type: Pre_Login_Fail });
        dispatch(setAlert(err.response.data.message, 'danger'))

        present({
            cssClass: 'error-message',
            header: 'Error message',
            message: err?.response?.data?.message || err?.message,
            buttons: [
              { text: 'CLOSE', handler: () => console.log('ok pressed') },
            ],
            onDidDismiss: () => console.log('did dismiss')
        });
        
    }
}

export const setForgotCredentials = (formData: any, setStep: any) => async(dispatch: Dispatch<any>) => {
    try {
        
        const res: any = await axios.post(URL + '/api/auth/recovery', formData);
        
        setStep(1)
        
        
        
    } catch (err: any) {

        console.log(err.message)

    }
}

export const preRecovery = (formData: any, setStep: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        const res: any = await axios.post(URL + '/api/auth/pre_recovery', formData);
        
        await setStep(1)
        
        
    } catch (err: any) {

        console.log(err.message)
        //dispatch(setAlert(err.response.data.message, 'danger'))
        
    }
}

export const verifySecret = (formData: any, setStep: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        const res: any = await axios.post(URL + '/api/auth/verify_secret', formData);
        
        await setStep(1)
        
    } catch (err: any) {

        console.log(err.message)
        //dispatch(setAlert(err.response.data.message, 'danger'))
        
    }
}

export const updateCredentials = (formData: any, history: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        const res: any = await axios.put(URL + '/api/auth/recovery', formData);
        
        await history.push('/')

        dispatch({ type: User_Update, payload: res?.data })
        
    } catch (err: any) {
        dispatch({ type: User_Update_Fail })
        console.log(err.message)
        //dispatch(setAlert(err.response.data.message, 'danger'))
        
    }
}

export const updateEmail = (formData: any, history: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        const res: any = await axios.put(URL + '/api/auth/email_recovery', formData);
        
        await history.push('/')

        dispatch({ type: User_Update, payload: res?.data })
        
    } catch (err: any) {
        dispatch({ type: User_Update_Fail })
        console.log(err.message)
        //dispatch(setAlert(err.response.data.message, 'danger'))
        
    }
}

export const preRegister = (formData: RegisterUserType, present: any, setStep: any) => async(dispatch: Dispatch<any>) => {
    try {
        const res: any = await axios.post(URL + '/api/auth/pre-register', formData);
        
        await setStep(4)
        dispatch({ type: Pre_Register_Success, payload: res.data })
        
        
    } catch (err: any) {
        dispatch({ type: Pre_Register_Fail });
        dispatch(setAlert(err.response.data.message, 'danger'))

        present({
            cssClass: 'error-message',
            header: 'Error message',
            message: err?.response?.data?.message || err?.message,
            buttons: [
              { text: 'CLOSE', handler: () => console.log('ok pressed') },
            ],
            onDidDismiss: () => console.log('did dismiss')
        });
        
    }
}

export const register = (formData: LoginUserType, history: any, present: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        dispatch({ type: Loading_Auth })
        const res: any = await axios.post(URL + '/api/users', formData);
        
        dispatch({ type: Register_Success, payload: res.data })

        dispatch(loadUser())
        
        dispatch(setAlert(res.data.message, 'success'))

        history.push('/')
        
    } catch (err: any) {
        dispatch({ type: Register_Fail });
        dispatch(setAlert(err.response.data.message, 'danger'))
        present({
            cssClass: 'error-message',
            header: 'Error message',
            message: err?.response?.data?.message || err?.message,
            buttons: [
              { text: 'CLOSE', handler: () => console.log('ok pressed') },
            ],
            onDidDismiss: () => console.log('did dismiss')
        });
        
    }
}

export const logout = ({history}: RouteComponentProps) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        dispatch({ type: Loading_Auth })
        dispatch({ type: Logout_User });
        history.push('/')
    } catch (err: any) {
        dispatch(setAlert('Could not log out.', 'danger'))
    }
}


export const confirm = (formData: any, history: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        dispatch({ type: Loading_Auth })
        const res: any = await axios.post(URL + '/api/auth/approve', formData);
        
        dispatch({ type: User_Update, payload: res?.data })
        history.push('/')
        return res.data.success
        
    } catch (err: any) {
        dispatch({ type: User_Update_Fail })
        console.log(err.message)
        //dispatch(setAlert(err.response.data.message, 'danger'))
        
    }
}

export const codeUpdate = () => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        dispatch({ type: Loading_Auth })
        const res: any = await axios.put(URL + '/api/auth/approve');
        
        dispatch({ type: User_Update, payload: res?.data })
        
        return res.data.success
        
    } catch (err: any) {
        dispatch({ type: User_Update_Fail })
        console.log(err.message)
        //dispatch(setAlert(err.response.data.message, 'danger'))
        
    }
}

export const update = (formData: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        dispatch({type: Loading_Auth })
        const res: any = await axios.put(URL + '/api/auth', formData);
        
        dispatch({type: User_Update, payload: res?.data})
        
        
    } catch (err: any) {
        dispatch({ type: User_Update_Fail })
        //dispatch(setAlert(err.response.data.message, 'danger'))
        
    }
}
export const createWallet = (formData: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        dispatch({type: Loading_Auth })
        const res: any = await axios.put(URL + '/api/auth/wallets', formData);
        
        dispatch({type: User_Update, payload: res.data})
        
        
    } catch (err: any) {
        dispatch({ type: User_Update_Fail })
        //dispatch(setAlert(err.response.data.message, 'danger'))
        
    }
}

export const updateIncome = (formData: any) => async(dispatch: Dispatch<AuthDispatchTypes>) => {
    try {
        dispatch({type: Loading_Auth })
        const res: any = await axios.put(URL + '/api/auth/income', formData);
        
        dispatch({type: User_Update, payload: res.data})
        
        
    } catch (err: any) {
        dispatch({ type: User_Update_Fail })
        //dispatch(setAlert(err.response.data.message, 'danger'))
        
    }
}
