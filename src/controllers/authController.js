import { createUser, getOneUser, getUserByEmail, updateUserStatus } from '../models/user/UserModel.js'
import { comparedPassword, hashPassword } from "../utils/bcrypt.js"
import {responseClient} from "../middleware/responseClient.js"
import { createSession, deleteSession } from '../models/session/SessionModel.js'
import { v4 as uuidv4 } from 'uuid'
import {
  userActivationEmail,
  userActivateEmail,
} from '../services/email/emailService.js'

import { createAccessJWT, decodeRefreshJWT, getJwts } from '../utils/jwt.js'
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
      const url = `${process.env.FRONT_END_URL}/activate-user?sessionId=${session?._id}&t=${session?.token}`
      
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
        const infoId = await userActivateEmail({ email: result.email, name: result.fName })
        const message = "your account is activated ready to use"
        responseClient({ req, res, message })
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

export const loginUser = async(req,res,next)=>{
  try {
    const { email, password } = req.body
    // get user using email
    const user = await getUserByEmail(email)
    // user exist
    console.log(user)
    let message="invalid login"
    if (user?._id) {
      if (user?.status === 'active') {
        // compared password
        const isPassed = comparedPassword(password, user?.password)
        if (isPassed) {
          // create jwts
         const jwts = await getJwts(email)
          
          message="login successful "
          return responseClient({req,res,message,jwts})
        }
      }
    }
    responseClient({req,res,message,statusCode:401})
  } catch (error) {
    next(error)
  }
}

export const renewAccessToken = async (req,res,next)=>{
 const {authorization} = req.headers
 const token = authorization.split(" ")[1]
 if(token){
  // decode 
  const result = decodeRefreshJWT(token)
  if(result?.email){

    // use email and refresh JWT to find user
    const user = await getOneUser({refreshJWT:token, email:result?.email})
    
    // create accessJWT using user email if user exist
    if(user?._id){
      const accessJWT = await createAccessJWT(user?.email)
      console.log(accessJWT)
      return responseClient({
        req,
        res,
        message:"new access token from refresh token",
        jwts:accessJWT
      })
    }

  }
 }

 responseClient({
  req,res,message:"", statusCode:"401"
 })
  
}