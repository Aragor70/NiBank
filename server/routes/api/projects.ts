

import express, {Request, Response, Router, NextFunction} from 'express';


const router: Router = express.Router();


import ProjectController from '../../controllers/ProjectController';

const projectController: any = new ProjectController;


//route get    api/projects
//description  get all projects
//access       public
router.get('/', projectController.getProjects);


//route get    api/projects
//description  get project by id
//access       public
router.get('/:project_id', projectController.getProjectById);

//route post   api/auth
//description  post new project
//access       private
router.post('/', projectController.createProject);

//route post   api/projects
//description  invest on project by project_id
//access       private
router.post('/:project_id', projectController.invest);


//route post   api/projects
//description  update project
//access       private
router.put('/:project_id', projectController.update);


//route post   api/projects
//description  delete project
//access       private
router.delete('/:project_id', projectController.deleteProjectById);

export default router;