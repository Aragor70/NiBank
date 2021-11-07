import { Get_Balance_Fail, Get_Balance_Success, Tsx_Create_Success, Get_My_Tsxs_Success, Get_My_Tsxs_Fail, Get_Total_Funds_Success, Get_Total_Funds_Fail, Get_YieldPA_Success, Get_YieldPA_Fail } from '../actions/tsx/types'


export const initialState = {
    tsxs: [],
    balance: 0,
    totalFunds: 0,
    yieldPA: 0,
    loading: true,
    errors: {}
}


const account = (state: any = initialState, action: any) => {
    const { type, payload } = action;
    switch(type) {
        
        case Get_Balance_Success:
            return {...state, balance: payload, loading: false }

        case Get_My_Tsxs_Success:
            return {...state, tsxs: payload, loading: false }

        case Get_Total_Funds_Success:
            return {...state, totalFunds: payload, loading: false }

        case Get_YieldPA_Success:
            return {...state, yieldPA: payload, loading: false }

        case Get_YieldPA_Fail:
            return {...state, yieldPA: 0, loading: false }

        case Get_Total_Funds_Fail:
            return {...state, totalFunds: 0, loading: false }

        case Get_My_Tsxs_Fail:
            return {...state, tsxs: [], loading: false }

        case Get_Balance_Fail:
            return {...state, balance: 0, loading: false }
         
        case Tsx_Create_Success:
            return {...state, tsxs: [...state.tsxs, payload.tsx], loading: false }

        default:
            return state;
    }
}

export default account;