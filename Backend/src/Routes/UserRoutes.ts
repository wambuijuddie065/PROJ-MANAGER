import { Router } from "express";
import { checkUser, getHomepage,  getUserById, getUsers, loginUser, registerUser } from "../Controllers/UserControllers";
import { VerifyToken } from "../Middleware/VerifyToken";
const routerU=Router()


routerU.post('/login',loginUser)
routerU.post('/register',registerUser)
routerU.get('/dashboard',VerifyToken,getHomepage)
routerU.get('/check',VerifyToken,checkUser)
routerU.get('/',getUsers)
routerU.get('/:id',getUserById)
routerU.put('/:id')


export default routerU