import { Tsx_Create_Success, Tsx_Create_Fail, Get_My_Tsxs_Success, Get_My_Tsxs_Fail, Get_Tsxs_Success, Get_Tsxs_Fail } from '../actions/tsx/types'


export const initialState = {
    tsxs: [],
    loading: true,
    errors: {}
}


const tsx = (state: any = initialState, action: any) => {
    const { type, payload } = action;
    switch(type) {

        case Get_Tsxs_Success:
            return {...state, tsxs: payload, loading: false }        

        case Get_Tsxs_Fail:
            return {...state, tsxs: [], loading: false }

        case Tsx_Create_Success:
            return {...state, tsxs: [...state.tsxs, payload.tsx], loading: false }

        case Tsx_Create_Fail:
            return {...state, loading: false }    
        
        default:
            return state;
    }
}

export default tsx;