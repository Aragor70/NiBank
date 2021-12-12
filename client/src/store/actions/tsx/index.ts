import { Dispatch } from 'redux';
import axios from "axios";
import { setAlert } from "../alert";
import { Tsx_Create_Success, Invest_Create_Success, Tsx_Create_Fail, Invest_Create_Fail, Get_Balance_Success, Get_Balance_Fail, Get_Tsxs_Success, Get_Tsxs_Fail, Get_My_Tsxs_Success, Get_Total_Funds_Success, Get_YieldPA_Success, Get_Total_Funds_Fail, Get_YieldPA_Fail, Get_My_Tsxs_Fail, Tsx_Loading, Get_My_Investments_Fail, Get_Tsx_Success, Get_Tsx_Fail, Get_Wallets_Fail, Get_Wallets_Success, Update_Main_Wallet_Success, Update_Main_Wallet_Fail, Account_Loading } from './types';
import { Loading_Auth, User_Update, User_Update_Fail } from '../auth/types';


export const newTsx = (formData: any, history: any, present: any) => async(dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: Tsx_Loading });

        const res: any = await axios.post('/api/tsx', formData);
        console.log(res.data)
        dispatch({ type: Tsx_Create_Success, payload: res.data })
        
        dispatch(setAlert(res?.data?.message, 'success'))

        history.push('/')
        
    } catch (err: any) {
        dispatch({ type: Tsx_Create_Fail });
        dispatch(setAlert(err.message, 'danger'))

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

export const newInvest = (id: number, formData: any, history: any, present: any) => async(dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: Tsx_Loading });

        const res: any = await axios.post(`/api/projects/${id}`, formData);
        console.log(res.data)
        dispatch({ type: Tsx_Create_Success, payload: res.data })
        
        dispatch(setAlert(res.data.message, 'success'))

        history.push('/')
        
    } catch (err: any) {
        dispatch({ type: Invest_Create_Fail });
        //dispatch(setAlert(err.response.data.message, 'danger'))
        
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


export const updateMainWallet = (e: any) => async (dispatch: Dispatch<any>) => {
    try {
        await dispatch({ type: Loading_Auth });

        const res: any = await axios.put('/api/auth/main_wallet', { main_wallet: e.target.value })
        

        await dispatch({ type: User_Update, payload: res?.data })
        
        //dispatch(setAlert(res.data.message, 'success'))
        return e.target.value
        
    } catch (err: any) {
        dispatch({ type: User_Update_Fail });

        //dispatch(setAlert(err.message, 'danger'))

    }
}

export const getBalance = (user: any = null) => async(dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: Tsx_Loading });
        dispatch({ type: Account_Loading });
        
        
        const res: any = await axios.get('/api/tsx');
        
        let balance = 0;

        let wallets: any[] = user?.wallets?.length ? user?.wallets?.map((element: any) => ({ balance: 0, currency: element, out: 0, in: 0 })) : []

        const isMatch = wallets.length ? await wallets?.filter((element: any) => element.currency === user.main_wallet)[0] : null;

        if (!isMatch && user?.main_wallet) {
            
            wallets.unshift({ balance: 0, currency: user?.main_wallet, out: 0, in: 0 })

        } else if (isMatch && user?.main_wallet) {
            wallets = wallets.reduce((acc: any, element: any) => {
                if (element.currency === user.main_wallet) {
                  return [element, ...acc];
                }
                return [...acc, element];
              }, []);
        }
        
        
        const myTransactions = user ? await res.data.filter((element: any) => (element?.from_id?.toString() === user?.user_id?.toString()) || (element?.to_user_id?.toString() === user?.user_id?.toString())) : []
        let myTotalFunds = 0
        let myYieldPA = 0
        
        // let validated: any[] = res.data.filter((element: any, index: number) => index ?  ((element.previous_hash !== element.current_hash) && ( index ? element.previous_hash === res.data[index - 1].current_hash : true )) : true)

        console.log(res.data)
            
        for (const transaction of res.data) {
            
            if (user && transaction?.from_id?.toString() === user?.user_id?.toString()) {
                //{...element, balance: (element?.balance || 0) - transaction.amount, currency: transaction.currency, out: transaction.amount}
                balance -= transaction.amount;
                myTotalFunds += transaction.amount;
                wallets = (!!wallets.length ? wallets.map((element: any) => element?.currency?.toString() === transaction?.currency?.toString() ? {...element, balance: element?.balance - transaction.amount, currency: transaction.currency, out: element.out + transaction.amount, in: (element.in || 0) } : element ) : [...wallets, { balance: 0 - transaction.amount, currency: transaction.currency, out: transaction.amount, in: 0}])

            }
            if (user && transaction?.to_user_id && transaction?.to_user_id?.toString() === user?.user_id?.toString()) {
                
                balance += transaction.amount;
                myYieldPA += transaction.amount;
                wallets = !!wallets.length ? wallets.map((element: any) => element?.currency?.toString() === transaction?.currency?.toString() ? {...element, balance: element?.balance + transaction.amount, in: element.in + transaction.amount, currency: transaction.currency, out: (element.out || 0) } : element ) : [...wallets, { balance: transaction.amount, currency: transaction.currency, out: 0, in: transaction.amount}]

            }
            
        }
        
        dispatch({ type: Get_Balance_Success, payload: balance || 0 })
        dispatch({ type: Get_Wallets_Success, payload: wallets || [] })
        dispatch({ type: Get_Tsxs_Success, payload: res.data || [] })
        dispatch({ type: Get_My_Tsxs_Success, payload: myTransactions || [] })
        dispatch({ type: Get_Total_Funds_Success, payload: myTotalFunds || 0})
        dispatch({ type: Get_YieldPA_Success, payload: myYieldPA || 0 })
        
        dispatch(setAlert(res.data.message, 'success'))

        
    } catch (err: any) {
        dispatch({ type: Get_Balance_Fail });
        dispatch({ type: Get_Wallets_Fail });
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