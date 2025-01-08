import Joi from 'joi'

export const validateData = ({req,res,next,obj})=>{
    const { value, error } = obj.validate(req.body)
    if (error) {
      res.status(404).json({
        status: 'error',
        message: error.message,
      })
    }
    next()
}