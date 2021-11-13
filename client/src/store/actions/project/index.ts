import { Dispatch } from 'redux';
import axios from "axios";
import { setAlert } from "../alert";
import { Project_Create_Success, Project_Create_Fail, Get_Projects_Success, Get_Open_Projects_Success, Get_Under_Consideration_Projects_Success, Get_Closed_Projects_Success, Get_Project_Success, Get_Project_Fail, Get_Projects_Fail, Get_Open_Projects_Fail, Get_Under_Consideration_Projects_Fail, Get_Closed_Projects_Fail, Project_Loading } from './types';


export const newProject = (formData: any, history: any, present: any) => async(dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: Project_Loading });

        const res: any = await axios.post('/api/projects', formData);
        console.log(res.data)
        dispatch({ type: Project_Create_Success, payload: res.data })
        
        dispatch(setAlert(res.data.message, 'success'))

        history.push('/')
        
    } catch (err: any) {
        dispatch({ type: Project_Create_Fail });
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

export const getProjects = () => async(dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: Project_Loading });
        
        const res: any = await axios.get('/api/projects');
        
        
        const openProjects = await res.data.projects.filter((element: any) => element.status.toString() === "OPEN")
        const underconsideration = await res.data.projects.filter((element: any) => element.status?.toString() === "UNDER_CONSIDERATION")
        const closedProjects = await res.data.projects.filter((element: any) => (element.status !== "OPEN" && element.status !== "UNDER_CONSIDERATION"))
        

        dispatch({ type: Get_Projects_Success, payload: res.data.projects })
        dispatch({ type: Get_Open_Projects_Success, payload: openProjects })
        dispatch({ type: Get_Under_Consideration_Projects_Success, payload: underconsideration })
        dispatch({ type: Get_Closed_Projects_Success, payload: closedProjects })
        
        dispatch(setAlert(res.data.message, 'success'))

        
    } catch (err: any) {
        dispatch({ type: Get_Projects_Fail });
        dispatch({ type: Get_Open_Projects_Fail });
        dispatch({ type: Get_Closed_Projects_Fail });

        dispatch(setAlert(err.message, 'danger'))

    }
}

export const getProject = (id: number) => async(dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: Project_Loading });

        const res: any = await axios.get(`/api/projects/${id}`);
        

        dispatch({ type: Get_Project_Success, payload: res?.data?.projects[0] })
        
        dispatch(setAlert(res.data.message, 'success'))

        
    } catch (err: any) {
        dispatch({ type: Get_Project_Fail });

        dispatch(setAlert(err.message, 'danger'))

    }
}