import { createUser } from "../models/user/UserModel.js"
import { hashPassword } from "../utils/bcrypt.js"


export const insertNewUser = async(req,res,error)=>{
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
    console.log(error)
    next(error)
   }
}