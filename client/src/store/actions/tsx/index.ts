import { Dispatch } from 'redux';
import axios from "axios";
import { setAlert } from "../alert";
import { Tsx_Create_Success, Tsx_Create_Fail, Get_Balance_Success, Get_Balance_Fail, Get_Tsxs_Success, Get_Tsxs_Fail, Get_My_Tsxs_Success, Get_Total_Funds_Success, Get_YieldPA_Success, Get_Total_Funds_Fail, Get_YieldPA_Fail } from './types';


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
        const myTransactions = await res.data.filter((element: any) => (element.from_id.toString() === user.user_id.toString()) || (element.to_user_id.toString() === user.user_id.toString()))
        let myTotalFunds = 0
        let myYieldPA = 0

        
        console.log(res.data)
        console.log(user)
            
        for (const transaction of res.data) {
            
            if (transaction.from_id.toString() === user.user_id.toString()) {
                
                balance -= transaction.amount;
                myTotalFunds += transaction.amount;
            }
            if (transaction.to_user_id.toString() === user.user_id.toString()) {
                
                balance += transaction.amount;
                myYieldPA += transaction.amount;
            }
            
        }
        console.log(balance)

        dispatch({ type: Get_Balance_Success, payload: balance })
        dispatch({ type: Get_Tsxs_Success, payload: res.data })
        dispatch({ type: Get_My_Tsxs_Success, payload: myTransactions })
        dispatch({ type: Get_Total_Funds_Success, payload: myTotalFunds })
        dispatch({ type: Get_YieldPA_Success, payload: myYieldPA })
        
        dispatch(setAlert(res.data.message, 'success'))

        
    } catch (err: any) {
        dispatch({ type: Get_Balance_Fail });
        dispatch({ type: Get_Tsxs_Fail });
        dispatch({ type: Get_My_Tsxs_Success });
        dispatch({ type: Get_Total_Funds_Fail });
        dispatch({ type: Get_YieldPA_Fail });

        dispatch(setAlert(err.message, 'danger'))

    }
}