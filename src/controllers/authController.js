import { createUser, updateUserStatus } from '../models/user/UserModel.js'
import { hashPassword } from "../utils/bcrypt.js"
import {responseClient} from "../middleware/responseClient.js"
import { createSession, deleteSession } from '../models/session/SessionModel.js'
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
      const message = 'user created, activation link sent to your email, follow the instructions.'
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
export const activeNewUser = async(req,res,next)=>{
  try {
    const {sessionId, t} =req.body
   
    // delete session  and update user status to active 
    

    const session = await deleteSession({_id:sessionId,token:t})

    if(session?._id){
      // find user using association(which is email in user collection) in session collections
      const result = await updateUserStatus({email:session?.association})
      if(result?.status==="active"){
        // send an email saying your account is activated 
        const msg = "your account is activated ready to use"
        responseClient({req,res,msg})
        return
      }
    }
    
    throw new Error('Unable to activate your account, Try again')
    
  } catch (error) {
    if (error.message.includes("Unable to activate your account, Try again")){
      error.statusCode = 400
    }
    console.log('error details',error)
      next(error)
  }
}