import { Project_Create_Success, Project_Create_Fail, Get_Projects_Success, Get_Open_Projects_Success, Get_Under_Consideration_Projects_Success, Get_Closed_Projects_Success, Get_Projects_Fail, Get_Open_Projects_Fail, Get_Under_Consideration_Projects_Fail, Get_Closed_Projects_Fail, Get_Project_Success, Get_Project_Fail, Project_Loading, Project_Update_Success, Project_Update_Fail, Project_Delete_Success, Project_Delete_Fail } from '../actions/project/types'


export const initialState = {
    projects: [],
    openProjects: [],
    underConsiderationProjects: [],
    closedProjects: [],
    project: null,
    loading: true,
    errors: {}
}


const project = (state: any = initialState, action: any) => {
    const { type, payload } = action;
    switch(type) {

        case Get_Projects_Success:
            return {...state, projects: payload, loading: false }

        case Get_Project_Success:
            return {...state, project: payload, loading: false }
        
        case Get_Open_Projects_Success:
            return {...state, openProjects: payload, loading: false }
        
        case Get_Under_Consideration_Projects_Success:
            return {...state, underConsiderationProjects: payload, loading: false }

        case Get_Closed_Projects_Success:
            return {...state, closedProjects: payload, loading: false }

        case Project_Update_Success:
            return {...state, project: payload, loading: false }

        case Project_Delete_Success:
            return {...state, project: null, projects: state.projects.filter((element: any) => element?.project_id?.toString() !== payload?.toString()), underConsiderationProjects: state.underConsiderationProjects.filter((element: any) => element?.project_id?.toString() !== payload?.toString()) , loading: false }

        case Project_Delete_Fail:
            return {...state, loading: false }

        case Project_Create_Success:
            return {...state, projects: [...state.projects, payload.project], openProjects: payload.project.status === "OPEN" ? [...state.openProjects, payload.project] : state.openProjects, closedProjects: payload.project.status !== "OPEN" ? [...state.closedProjects, payload.project] : state.closedProjects, loading: false }

        case Get_Projects_Fail:
            return {...state, projects: [], loading: false }

        case Project_Update_Fail:
            return {...state, loading: false }

        case Get_Project_Fail:
            return {...state, project: null, loading: false }

        case Get_Open_Projects_Fail:
            return {...state, openProjects: [], loading: false }

        case Get_Closed_Projects_Fail:
            return {...state, closedProjects: [], loading: false }

        case Get_Under_Consideration_Projects_Fail:
            return {...state, underConsiderationProjects: [], loading: false }

        case Project_Create_Fail:
            return {...state, projects: [], openProjects: [], closedProjects: [], loading: false }

        case Project_Loading:
            return {...state, loading: true }


        default:
            return state;
    }
}

export default project;