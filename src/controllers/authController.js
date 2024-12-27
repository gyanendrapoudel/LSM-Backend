import { createUser } from "../models/user/UserModel.js"
import { hashPassword } from "../utils/bcrypt.js"


export const insertNewUser = async(req,res,next)=>{
    try {
    const{password} = req.body
    // password encryption
    req.body.password = hashPassword(password)
    const user = await createUser(req.body)
    user?.id
      ? res.json({
          status: 'success',
          message: 'user created',
          result: user,
          
        })
      : res.json({
          status: 'error',
          message: 'unable to  create user',
          
        })
   } catch (error) {
   
    if (error.message.includes('E11000 duplicate key error collection')){
      error.message="Email already register, please login"
      error.statusCode=400
    }

      next(error)
   }
}