import Joi from 'joi'

export const UserSchemaReg=Joi.object({
   
    email:Joi.string().required().email(),
    password:Joi.string().required().min(8),
    name:Joi.string().required()

})

export const UserSchemaLog=Joi.object({
    email:Joi.string().required().email(),
    password:Joi.string().required().min(8)

})