import Joi from "joi";

export const ProjectSchema1=Joi.object({
    project_name: Joi.string().required(),
    user_id: Joi.string().required(),

})