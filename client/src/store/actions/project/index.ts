import { Dispatch } from 'redux';
import axios from "axios";
import { setAlert } from "../alert";
import { Project_Create_Success, Project_Create_Fail, Get_Projects_Success, Get_Open_Projects_Success, Get_Under_Consideration_Projects_Success, Get_Closed_Projects_Success, Get_Project_Success, Get_Project_Fail, Get_Projects_Fail, Get_Open_Projects_Fail, Get_Under_Consideration_Projects_Fail, Get_Closed_Projects_Fail, Project_Loading, Project_Update_Success, Project_Update_Fail, Project_Delete_Success, Project_Delete_Fail } from './types';
import { Account_Loading, Get_My_Investments_Fail, Get_My_Investments_Success } from '../tsx/types';
import { URL } from '../../../utils/constants';
import ValidatingMethods from '../../../utils/ValidatingMethods';

const validatingMethods = new ValidatingMethods;

export const newProject = (formData: any, history: any, present: any) => async(dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: Project_Loading });

        const res: any = await axios.post(URL + '/api/projects', formData);
        
        dispatch({ type: Project_Create_Success, payload: res.data })
        
        dispatch(setAlert(res.data.message, 'success'))

        history.push(`/projects/${res?.data?.project?.project_id}`);
        
    } catch (err: any) {
        dispatch({ type: Project_Create_Fail });
        dispatch(setAlert(err.response.data.message, 'danger'))

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
export const updateProject = (formData: any, present: any) => async(dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: Project_Loading });

        const res: any = await axios.put(URL + `/api/projects/${formData.project_id}`, formData);
        
        dispatch({ type: Project_Update_Success, payload: res.data.project })
        
        dispatch(setAlert(res.data.message, 'success'))
        
    } catch (err: any) {
        dispatch({ type: Project_Update_Fail });
        dispatch(setAlert(err.response.data.message, 'danger'))

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

export const deleteProject = (id: any, present: any, history: any) => async(dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: Project_Loading });

        const res: any = await axios.delete(URL + `/api/projects/${id}`);
        
        dispatch({ type: Project_Delete_Success, payload: id })

        history.push('/projects');
        
        dispatch(setAlert(res.data.message, 'success'))
        
    } catch (err: any) {
        dispatch({ type: Project_Delete_Fail });
        dispatch(setAlert(err?.response?.data?.message, 'danger'))

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

export const getProjects = (user: any = null) => async(dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: Project_Loading });
        
        const res: any = await axios.get(URL + '/api/projects');
        const resTsx: any = await axios.get(URL + '/api/tsx');
        
        let projects = await res.data.projects.slice().map((element: any) => ({...element, listofinvestors: []}))
        
        let tsxs: any[] = await validatingMethods.getValidTsxs(resTsx?.data?.projects || []);
        
        const project_tsxs = await tsxs.filter((element: any) => ((element?.to_project_id !== undefined) && (element?.to_project_id !== null)));
        
        //let tsxs = resTsx.data.filter((element: any) => element.to_project_id !== undefined)
        
        for (const transaction of project_tsxs) {
            
            projects = await projects.map((element: any) => element.project_id === transaction.to_project_id ? {...element, volumeinvested: element.volumeinvested + transaction.amount, listofinvestors: [...element.listofinvestors, { user_id: transaction?.from_id, amount: transaction?.amount }] } : element)
            
        }
        console.log(projects)
        const openProjects = await projects.filter((element: any) => element.status.toString() === "OPEN")
        const underconsideration = await projects.filter((element: any) => element.status?.toString() === "UNDER_CONSIDERATION")
        const closedProjects = await projects.filter((element: any) => (element.status !== "OPEN" && element.status !== "UNDER_CONSIDERATION"))
        
        const myInvestments = user ? await projects.filter((element: any) => !!element.listofinvestors.filter((elem: any) => elem?.user_id === user?.user_id)[0]) : [];
        
        dispatch({ type: Get_Projects_Success, payload: projects })
        dispatch({ type: Get_Open_Projects_Success, payload: openProjects })
        dispatch({ type: Get_Under_Consideration_Projects_Success, payload: underconsideration })
        dispatch({ type: Get_Closed_Projects_Success, payload: closedProjects })
        dispatch({ type: Get_My_Investments_Success, payload: myInvestments || [] })

        dispatch(setAlert(res.data.message, 'success'))

        
    } catch (err: any) {
        dispatch({ type: Get_Projects_Fail });
        dispatch({ type: Get_Open_Projects_Fail });
        dispatch({ type: Get_Closed_Projects_Fail });
        dispatch({ type: Get_My_Investments_Fail });

        dispatch(setAlert(err.message, 'danger'))

    }
}

export const getProject = (id: number) => async(dispatch: Dispatch<any>) => {
    try {
        await dispatch({ type: Project_Loading });

        const res: any = await axios.get(URL + `/api/projects/${id}`);
        const resTsx: any = await axios.get(URL + '/api/tsx');

        let tsxs = await validatingMethods.getValidTsxs(resTsx.data || []);

        const project_tsxs = await tsxs.filter((element: any) => ((element?.to_project_id !== undefined) && (element?.to_project_id !== null)));


        const investedValues: any = await project_tsxs?.filter((element: any) => (element?.to_project_id?.toString() === id?.toString()) )?.map((element: any)=> element?.amount || 0)
        
        const volumeinvested: number = investedValues.length ? investedValues?.reduce((a: number, b: number) => a + b) : 0
        
        const projectData = {...res?.data?.project, volumeinvested }
        
        //console.log(projectData)
        await dispatch({ type: Get_Project_Success, payload: projectData })
        
        //await dispatch(setAlert(res.data.message, 'success'))
        return projectData
        
    } catch (err: any) {
        dispatch({ type: Get_Project_Fail });

        dispatch(setAlert(err.message, 'danger'))

    }
}


export const clearProject = () => async(dispatch: Dispatch<any>) => {
    await dispatch({ type: Project_Loading });
    dispatch({ type: Get_Project_Fail });
    
    return { success: true }
}
export const clearProjects = () => async(dispatch: Dispatch<any>) => {
    await dispatch({ type: Project_Loading });
    dispatch({ type: Get_Projects_Fail });
    dispatch({ type: Get_My_Investments_Fail });
    dispatch({ type: Get_Under_Consideration_Projects_Fail });
    dispatch({ type: Get_Open_Projects_Fail });
    dispatch({ type: Get_Closed_Projects_Fail });

    return { success: true }
}