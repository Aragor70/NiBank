import { Tsx_Create_Success, Tsx_Create_Fail, Get_Tsx_Success, Get_Tsx_Fail, Get_Tsxs_Success, Get_Tsxs_Fail, Tsx_Loading } from '../actions/tsx/types'


export const initialState = {
    tsxs: [],
    tsx: null,
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

        case Get_Tsx_Success:
            return {...state, tsx: payload, loading: false }        

        case Get_Tsx_Fail:
            return {...state, tsx: null, loading: false }        
    
        case Tsx_Create_Success:
            return {...state, tsxs: [ payload.tsx, ...state.tsxs ], loading: false }

        case Tsx_Create_Fail:

            return {...state, loading: false }

        /* case Tsx_Loading:
            return {...state, loading: true } */
        
        default:
            return state;
    }
}

export default tsx;