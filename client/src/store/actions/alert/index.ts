import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { AlertDispatchTypes, Loading_Alert, Remove_Alert, Set_Alert } from "./types";

export const setAlert = (message: string, alertType: string) => (dispatch: Dispatch<AlertDispatchTypes>) => {
    
    dispatch({ type: Loading_Alert });
    
    const id: string = uuidv4();

    dispatch({ type: Set_Alert, payload: { id, message, type: alertType } });
    setTimeout(()=>dispatch({ type: Remove_Alert, payload: id }), 5000);
    
}