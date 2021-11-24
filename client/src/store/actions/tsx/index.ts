import { Dispatch } from 'redux';
import axios from "axios";
import { setAlert } from "../alert";
import { Tsx_Create_Success, Invest_Create_Success, Tsx_Create_Fail, Invest_Create_Fail, Get_Balance_Success, Get_Balance_Fail, Get_Tsxs_Success, Get_Tsxs_Fail, Get_My_Tsxs_Success, Get_Total_Funds_Success, Get_YieldPA_Success, Get_Total_Funds_Fail, Get_YieldPA_Fail, Get_My_Tsxs_Fail, Tsx_Loading, Get_My_Investments_Fail, Get_Tsx_Success, Get_Tsx_Fail } from './types';


export const newTsx = (formData: any, history: any, present: any) => async(dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: Tsx_Loading });

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

export const newInvest = (id: number, formData: any, history: any, present: any) => async(dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: Tsx_Loading });

        const res: any = await axios.post(`/api/projects/${id}`, formData);
        
        dispatch({ type: Invest_Create_Success, payload: res.data })
        
        dispatch(setAlert(res.data.message, 'success'))

        history.push('/')
        
    } catch (err: any) {
        dispatch({ type: Invest_Create_Fail });
        //dispatch(setAlert(err.response.data.message, 'danger'))

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
export const getTsx = (id: number) => async(dispatch: Dispatch<any>) => {
    try {
        await dispatch({ type: Tsx_Loading });

        const res: any = await axios.get(`/api/tsx/${id}`);
        

        await dispatch({ type: Get_Tsx_Success, payload: res?.data?.tsxs[0] })
        
        //dispatch(setAlert(res.data.message, 'success'))
        return res?.data?.tsxs[0];
        
    } catch (err: any) {
        dispatch({ type: Get_Tsx_Fail });

        //dispatch(setAlert(err.message, 'danger'))

    }
}

export const getBalance = (user: any = null) => async(dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: Tsx_Loading });
        //dispatch({ type: Account_Loading });
        
        
        const res: any = await axios.get('/api/tsx');
        
        let balance = 0
        
        const myTransactions = user ? await res.data.filter((element: any) => (element?.from_id?.toString() === user?.user_id?.toString()) || (element?.to_user_id?.toString() === user?.user_id?.toString())) : []
        let myTotalFunds = 0
        let myYieldPA = 0
        /* let myInvestments: any[] = [] */
        
        
        console.log(res.data)
        console.log(user)
            
        for (const transaction of res.data) {
            
            if (user && transaction.from_id.toString() === user.user_id.toString()) {
                
                balance -= transaction.amount;
                myTotalFunds += transaction.amount;
            }
            if (user && transaction.to_user_id && transaction.to_user_id.toString() === user.user_id.toString()) {
                
                balance += transaction.amount;
                myYieldPA += transaction.amount;
            }
            /* if (user && transaction.to_project_id !== null && transaction.from_id.toString() === user.user_id.toString()) {
                myInvestments = [...myInvestments, transaction]
            } */
            
        }
        
        dispatch({ type: Get_Balance_Success, payload: balance || 0 })
        dispatch({ type: Get_Tsxs_Success, payload: res.data || [] })
        dispatch({ type: Get_My_Tsxs_Success, payload: myTransactions || [] })
        dispatch({ type: Get_Total_Funds_Success, payload: myTotalFunds || 0})
        dispatch({ type: Get_YieldPA_Success, payload: myYieldPA || 0 })
        
        dispatch(setAlert(res.data.message, 'success'))

        
    } catch (err: any) {
        dispatch({ type: Get_Balance_Fail });
        dispatch({ type: Get_Tsxs_Fail });
        dispatch({ type: Get_My_Tsxs_Fail });
        dispatch({ type: Get_Total_Funds_Fail });
        dispatch({ type: Get_YieldPA_Fail });
        dispatch({ type: Get_My_Investments_Fail });

        dispatch(setAlert(err.message, 'danger'))

    }
}
export const clearTsx = () => async(dispatch: Dispatch<any>) => {
    await dispatch({ type: Tsx_Loading });
    await dispatch({ type: Get_Tsx_Fail });

}
export const clearTsxs = () => async(dispatch: Dispatch<any>) => {
    await dispatch({ type: Tsx_Loading });
    await dispatch({ type: Get_Tsxs_Fail });
    await dispatch({ type: Get_My_Tsxs_Fail });

}