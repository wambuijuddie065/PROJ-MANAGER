import ejs from "ejs";
import mssql from "mssql";
import dotenv from "dotenv";

import sendMail from "../Helpers/Email";
import { sqlConfig } from "../Config/Config";
import { log } from "console";
dotenv.config();
interface Task {
  name:string
  email: string
//   project_id:string
  project_name:string
  project_description:string
  due_date:string
//   is_complete:string
//   isassigned:string
  user_id:string
}


const SendAssignedEmails = async () => {
  const pool = await mssql.connect(sqlConfig);
  const tasks: Task[] = (await pool.request()
  .query(`SELECT U.user_id, U.email,U.name ,P.project_description,P.project_name,P.due_date FROM
  UsersTable U LEFT JOIN ProjectsTable P ON U.user_id = P.user_id 
 WHERE P.user_id IS NOT NULL AND P.isassigned='0'`)).recordset;

for(let atask of tasks){
    ejs.renderFile('Templates/Assigned.ejs',{name:atask.name,project_name:atask.project_name,project_description:atask.project_description,
      due_date:atask.due_date
    },async(error,data)=>{
        let mailOptions={
            from:process.env.EMAIL,
            to:atask.email,
            subject:'Group Judy Project',
            html:data,
            attachments:[
                {
                    filename:'task.txt',
                    content:`You have been assigned a task  : ${atask.project_name}`
                }
            ]
        }
        try {
            console.log(atask);
            
            await sendMail(mailOptions)
            await pool.request().query(`UPDATE UsersTable SET isassigned='1' WHERE user_id='${atask.user_id}'`)
            await pool.request().query(`UPDATE ProjectsTable SET isassigned='1' WHERE user_id='${atask.user_id}'`)
            console.log('EMAIL SENT SUCCESSFULLY');
               
        } catch (error:any) {
            console.log(error);
            
            
        }
    } )
}

};

export default SendAssignedEmails; 