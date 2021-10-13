export const Set_Alert = 'Set_Alert';
export const Remove_Alert = 'Remove_Alert';
  
  export type AlertType = {
    id: string,
    message: string,
    type: string
  }

  export type SetAlert = {
    type: typeof Set_Alert,
    payload: AlertType
  }

  export type RemoveAlert = {
    type: typeof Remove_Alert
  }
  
  export type AlertDispatchTypes = SetAlert | RemoveAlert