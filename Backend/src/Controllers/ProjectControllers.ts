import { Request, RequestHandler, Response } from "express";
import mssql from "mssql";
import { v4 as uid } from "uuid"; 
import { sqlConfig } from "../Config/Config";
import { ProjectSchema1 } from "../Helpers/ProjectValidator";

interface ExtendedRequest extends Request{
    body:{
      project_id:string
        project_name:string
        project_description:string
        due_date:string
        is_complete:string
        isassigned:string
        user_id:string
        email:string

    }
}



export const insertProject=async(req:ExtendedRequest,res:Response)=>{
    try {
        const pool=await mssql.connect(sqlConfig)
        const id=uid()
        const {project_name,project_description,due_date,email}=req.body
        await pool
        .request()
        .input("project_id", mssql.VarChar, id)
        .input("project_name", mssql.VarChar, project_name)
        .input("project_description", mssql.VarChar, project_description)
        .input("due_date", mssql.VarChar, due_date)
        .input("email",mssql.VarChar, email)
        .execute("insertProject");
  
      res.json({ message: "Project Added Successfully" });

        
    } catch (error:any) {
        res.json({error})
        
    }
}


export const getProject: RequestHandler<{id: string }> = async (req, res) => {
    try {
      const id = req.params.id
      const pool = await mssql.connect(sqlConfig);
      const projects = await pool
        .request()
        .input("project_id", mssql.VarChar, id)
        .execute("getProject");
      const { recordset } = projects;
  
      if (!projects.recordset[0]) {
        res.json({ message: "Project Not Found" });
      } else {
        res.json(recordset);
       
      }
      
    } catch (error: any) {
      res.json({ error });
    }
  };


  export const getUserProject: RequestHandler<{id: string }> = async (req, res) => {
    try {
      const id = req.params.id
      const pool = await mssql.connect(sqlConfig);
      const projects = await pool
        .query(`SELECT * FROM ProjectsTable WHERE user_id='${id}'`)
      const { recordset } = projects;
  
      if (!projects.recordset[0]) {
        res.json({ message: "Project Not Found" });
      } else {
        res.json(recordset);
       
      }
      
    } catch (error: any) {
      res.json({ error });
    }
  };


  export const updateProject: RequestHandler<{ id: string }> = async (req,res ) => {
    try {
      const id = req.params.id;
      const { project_name,project_description,due_date,is_complete,isassigned ,user_id} = req.body as {
        project_name:string
        project_description:string
        due_date:string
        is_complete:string
        isassigned:string
        user_id:string

      };
      const pool = await mssql.connect(sqlConfig);
      const projects = await pool
        .request()
        .input("project_id", mssql.VarChar, id)
        .execute("getProject");
  
      const { recordset } = projects;
      if (!projects.recordset[0]) {
        res.json({ message: "Project Not Found!" });
      } else {
        await pool.request()
        .input("project_id", mssql.VarChar, id)
        .input("project_name", mssql.VarChar, project_name)
        .input("project_description", mssql.VarChar, project_description)
        .input("due_date", mssql.VarChar, due_date)
        .input("is_complete", mssql.VarChar, is_complete)
        .input("isassigned", mssql.VarChar, isassigned)
        .input("user_id", mssql.VarChar, user_id)
        .execute("updateProject");
        res.json({
          message: "Project updated successfully!",
        });
      }
    } catch (error: any) {
      res.json({ error });
    }
  };

export const getProjects: RequestHandler = async (req, res) => {
    try {
      const pool = await mssql.connect(sqlConfig);
      const projects = await pool.request().execute("getProjects");
      res.json(projects.recordset);
    } catch (error: any) {
      res.json({ Error });
    }
  };

export const deleteProject:RequestHandler<{id:string}>=async (req,res)=>{
    try {
        const id=req.params.id;
        const pool=await mssql.connect(sqlConfig);
        const projects=await pool.request()
        .input("project_id", mssql.VarChar, id)
        .execute('getProject')
        const {recordset}=projects;
        if(!projects.recordset[0]) {
            res.json({message:'Project Not Found'})
            
        } else {
            await pool.request()
            .input("project_id", mssql.VarChar, id)
            .execute("deleteProject")
            res.json({message:'Project Deleted Successfully'})
        }
        
    } catch (error:any) {
        res.json({ error });
        
    }
 }


 export const assignNewProject=async (req:ExtendedRequest,res: Response)=>{
  try {
      
      const pool=await mssql.connect(sqlConfig);
      const {project_name,user_id}= req.body
      const {error,value}=ProjectSchema1.validate(req.body)
      if (error) {
        return res.json({error:error.details[0].message})
      }else{
        await pool.request()
        .input("p_name",mssql.VarChar,project_name)
        .input("u_id", mssql.VarChar, user_id)
        .execute("assignProject")
        res.json({message:'project assigned'})
      }
    
     
    
  } catch (error:any) {
      res.json({ error });
      
  }
}



