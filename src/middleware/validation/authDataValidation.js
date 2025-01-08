import Joi from 'joi'
import { EMAIL, FNAME, LNAME, PASSWORD, PHONE } from './joiConst.js'
import { validateData } from './joiValidation.js'

export const newUserDataValidation = (req,res,next)=>{
    const obj = Joi.object({
        fName:FNAME.required(),
        lName:LNAME.required(),
        phone:PHONE,
        email:EMAIL.required(),
        password:PASSWORD.required()

    })
    validateData({req,res,next,obj})
}