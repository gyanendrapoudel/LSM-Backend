import { createUser } from "../models/user/UserModel.js"
import { hashPassword } from "../utils/bcrypt.js"
import {responseClient} from "../middleware/responseClient.js"
import { createSession } from "../models/session/SessionModel.js"
import { v4 as uuidv4 } from 'uuid'
import { userActivationEmail } from "../services/email/emailService.js"

export const insertNewUser = async(req,res,next)=>{
    try {
    const{password} = req.body
    // password encryption
    req.body.password = hashPassword(password)
    const user = await createUser(req.body)
    if(user?._id){
      const sessionObj = {
        token: uuidv4(),
        association:user?.email
      }
      const session = await createSession(sessionObj)
      const url = `${process.env.ROOT_URL}/activate-user?sessionId=${session?._id}&t=${session?.token}`
      
      const infoId = await userActivationEmail({url, name:user.fName, email:user.email})
      console.log("infoId, ", infoId)
      const message = 'user created'
      responseClient({req,res,message})

      //  res.json({
      //     status: 'success',
      //     message: 'user created',
      //     result: user,
          
      //   })
        return
      }
      throw new Error('unable to  create user');
       
   } catch (error) {
   
    if (error.message.includes('E11000 duplicate key error collection')){
      error.message="Email already register, please login"
      error.statusCode=400
    }

      next(error)
   }
}