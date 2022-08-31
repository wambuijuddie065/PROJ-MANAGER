import { Router } from "express";
import { assignNewProject, deleteProject, getProject, getProjects, getUserProject, insertProject, updateProject } from "../Controllers/ProjectControllers";
import { VerifyToken } from "../Middleware/VerifyToken";
const routerP=Router()


routerP.post('/add',insertProject)//insertProject
routerP.post('/')//asignProject
routerP.get('/:id',getProject)//getProject
routerP.get('/',VerifyToken,getProjects)//getProjects
routerP.put('/:id',updateProject)//updateProject
routerP.delete('/:id',deleteProject)//deleteProject
routerP.post('/assignProject',assignNewProject)//assignNewProject
routerP.get('/:id/getone',getUserProject)

export default routerP;