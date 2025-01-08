import Joi from 'joi'
import { EMAIL, FNAME, LNAME, PASSWORD, PHONE } from './joiConst.js'

export const newUserDataValidation = (req,res,next)=>{
    const schema = Joi.object({
        fName:FNAME.required(),
        lName:LNAME.required(),
        phone:PHONE,
        email:EMAIL.required(),
        password:PASSWORD.required()

    })
    const {value, error} = schema.validate(req.body)
    if(error){
        res.status(404).json({
          status: 'error',
          message: error.message
        })
    }
    next()
}