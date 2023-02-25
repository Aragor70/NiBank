import { Set_Alert, Remove_Alert, Loading_Alert } from '../actions/alert/types'

/* interface Alert {
    id: string
    message: string
    type: string
} */
interface AlertState {
    alerts: any[];
    loading: boolean;
}

export const initialState = {
    alerts: [],
    loading: false
};

const alert = (state: AlertState = initialState, action: any ): AlertState => {
    const { type, payload } = action;

    switch(type) {
        case Loading_Alert:
            return {...state, loading: true}
        case Set_Alert:
            return {...state, alerts: [...state.alerts, payload], loading: false}
        case Remove_Alert:
            return {...state, alerts: state.alerts.filter(element => element.id !== payload), loading: false}
        default:
            return state;
    }   

}
export default alert;