import express, { json, NextFunction, Request, Response, Router } from 'express'
import routerP from './Routes/ProjectRoutes'
import routerU from './Routes/UserRoutes'
import cors from 'cors'
const app=express()


app.use(json())
app.use(cors())

app.use('/projects',routerP)
app.use('/users',routerU)

app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
    res.json({Error:err.message})
})

app.listen(5000,()=>{
    console.log("Application Running");
    
})
