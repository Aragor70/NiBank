import { Dispatch } from 'redux';
import axios from "axios";
import { setAlert } from "../alert/";
import { Tsx_Create_Success, Tsx_Create_Fail } from './types';
import { Get_Balance_Fail, Get_Balance_Success } from '../auth/types';




export const newTsx = (formData: any, history: any, present: any) => async(dispatch: Dispatch<any>) => {
    try {
        
        const res: any = await axios.post('/api/tsx', formData);
        
        dispatch({ type: Tsx_Create_Success, payload: res.data })
        
        dispatch(setAlert(res.data.message, 'success'))

        history.push('/')
        
    } catch (err: any) {
        dispatch({ type: Tsx_Create_Fail });
        dispatch(setAlert(err.response.data.message, 'danger'))

        present({
            cssClass: '',
            header: 'Error:',
            message: err.message,
            buttons: [
              { text: 'Ok', handler: () => console.log('ok pressed') },
            ],
            onDidDismiss: () => console.log('did dismiss')
        });
        
    }
}

export const getBalance = (user: any) => async(dispatch: Dispatch<any>) => {
    try {
        
        const res: any = await axios.get('/api/tsx');
        
        let balance = 0

        balance = await res.data.foreach((element: any) => element.from_id === user.user_id ? balance -= element.amount : element.to_id === user.user_id ? balance += element.amount: false )
        
        for (const transaction of res.data) {
            
            if (transaction.from_id === user.user_id) {
                console.log('hi')
                balance -= transaction.amount;

            }
            if (transaction.to_id === user.user_id) {
                
                balance += transaction.amount;

            }
                
        }
        console.log(balance)
        return

/* 

        dispatch({ type: Get_Balance_Success, payload: res.data })
        
        dispatch(setAlert(res.data.message, 'success')) */

        
    } catch (err: any) {
        /* dispatch({ type: Get_Balance_Fail });
        dispatch(setAlert(err.response.data.message, 'danger')) */

    }
}