import Joi from 'joi'
import { responseClient } from '../responseClient.js'
import { errorHandler } from '../errorHandler.js'

export const validateData = ({req,res,next,obj})=>{
    const { value, error } = obj.validate(req.body)
    if(error){
        error.statusCode= 404
        errorHandler(error,req,res,next)
    }
   
    next()
}