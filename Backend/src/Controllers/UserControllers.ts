import { Request, RequestHandler, Response } from "express";
import mssql from "mssql";
import { v4 as uid } from "uuid";
import { sqlConfig } from "../Config/Config";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Data, User } from "../Interfaces/interfaces";
import { UserSchemaLog, UserSchemaReg } from "../Helpers/UserValidator";
import jwt from "jsonwebtoken";
dotenv.config();

interface Extended extends Request{
    info?:Data
}

interface ExtendedRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export const registerUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const id = uid();
    const { name, email, password } = req.body;
    const { error, value } = UserSchemaReg.validate(req.body);
    if (error) {
      res.json({ error: error.details[0].message });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool
      .request()
      .input("user_id", mssql.VarChar, id)
      .input("name", mssql.VarChar, name)
      .input("email", mssql.VarChar, email)
      .input("password", mssql.VarChar, hashedPassword)
      .execute("insertUser");

    res.json({ message: "User Registered Successfully" });
  } catch (error: any) {
    res.json({ error });
  }
};

export const loginUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const { name,email, password } = req.body;
    const pool = await mssql.connect(sqlConfig);

    const { error, value } = UserSchemaLog.validate(req.body);
    if (error) {
      res.json({ error: error.details[0].message });
    }

    const user:User[] = await (
      await pool
        .request()
        .input("email", mssql.VarChar, email)
        .execute("getUser")
    ).recordset
     
    if (!user[0]) {
      return res.json({ message: "User Not Found",success:false });
    }else{ 
        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
          return  res.json({ message: 'Invalid Password!', success:false });
        }
        
      
        
        const payload = user.map((item) => {
          const { password, ...rest } = item;
          return rest;
        });
       

        const token = jwt.sign(payload[0], process.env.KEY as string, {
          expiresIn: "3600s",
        });
        return res.json({ message: "User logged in Successfully!",token,success:true })
      }
 
   
  } catch (error) {
    res.json({ error });
  }
};
export const getHomepage=async (req:Extended,res:Response)=>{
    if (req.info) {
        res.json({message:`Dear ${req.info.email} Welcome to the homepage!!`})
        
    }
    
}
export const checkUser= async (req:Extended, res:Response)=>{
  if(req.info){
    res.json({user_id:req.info.user_id,name:req.info.name, role:req.info.role,email:req.info.email})
  }
}
export const getUsers: RequestHandler= async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const users = await pool.request().execute("getUsers");
    res.json(users.recordset);
  } catch (error: any) {
    res.json({ Error });
  }
};

export const getUserById: RequestHandler<{id: string }> = async (req, res) => {
  try {
    const id = req.params.id
    const pool = await mssql.connect(sqlConfig);
    const users = await pool
      .request()
      .input("user_id", mssql.VarChar, id)
      .execute("getUserById");
    const { recordset } = users;

    if (!users.recordset[0]) {
      res.json({ message: "User Not Found" });
    } else {
      res.json(recordset);
     
    }
    
  } catch (error: any) {
    res.json({ error });
  }
};

export const updateUser: RequestHandler<{ id: string }> = async (req,res ) => {
  try {
    const id = req.params.id;
    const { user_id,name,email,password,role,isassigned,project_id,issent} = req.body as {
      user_id:string
      name:string
      email:string
      password:string
      role:string
      isassigned:string
      project_id:string
      issent:boolean

    };
    const pool = await mssql.connect(sqlConfig);
    const users = await pool
      .request()
      .input("user_id", mssql.VarChar, id)
      .execute("getUserById");

    const { recordset } = users;
    if (!users.recordset[0]) {
      res.json({ message: "User Not Found!" });
    } else {
      await pool.request()
      .input("user_id", mssql.VarChar, id)
      .input("name", mssql.VarChar,name)
      .input("email", mssql.VarChar, email)
      .input("password", mssql.VarChar,password)
      .input("role", mssql.VarChar,role )
      .input("isassigned", mssql.VarChar, isassigned)
      .input("project_id", mssql.VarChar, project_id)
      .execute("updateUser");
      res.json({
        message: "User updated successfully!",
      });
    }
  } catch (error: any) {
    res.json({ error });
  }
};