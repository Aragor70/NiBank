import ProjectController from "../controllers/ProjectController"

const projectController = new ProjectController;

const monthlyProcess = async () => {


    const yieldPA = await projectController.returnYield();

    console.log('monthlyProcess', yieldPA)

}

monthlyProcess()