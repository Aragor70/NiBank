import { Set_Alert, Remove_Alert } from '../actions/alert/types'

/* interface Alert {
    id: string
    message: string
    type: string
} */
interface AlertState {
    alerts: any[]
}

export const initialState = {
    alerts: []
};

const alert = (state: AlertState = initialState, action: any ): AlertState => {
    const { type, payload } = action;

    switch(type) {
        case Set_Alert:
            return {...state, alerts: [...state.alerts, payload]}
        case Remove_Alert:
            return {...state, alerts: state.alerts.filter(element => element.id !== payload)}
        default:
            return state;
    }   

}
export default alert;