import { getSession } from "../models/session/SessionModel.js"
import { getUserByEmail } from "../models/user/UserModel.js"
import { decodeAccessJWT } from "../utils/jwt.js"
import { responseClient } from "./responseClient.js"

export const userAuthMiddleware = async(req,res,next)=>{
     // get token from headers
  // decode the token if expired response 
  // check that token exist on session table
  // get the user using email from token
  // check if the user is active
  // active response user details
  // get token from headers
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
     let message = 'Invalid login'
  if(token){
    // decode the token
    const decode = decodeAccessJWT(token)
    decode === 'jwt expired'
      ? (message = 'wt expired')
      : (message = 'Invalid login')
     if(decode.email){
       // check that token is on session table
       const newSession = await getSession({ token })
       if (newSession._id) {
        // get user using email address
        const user = await getUserByEmail(decode.email)
        if(user._id && user.status==='active'){
         
         req.userInfo = user
         console.log(user)
          next()
        }
        }
       
     }
        
        
   
  }
 

  // check that token exist on session table
  // get the user using email from token
  // check if the user is active
  // active response user details

  responseClient({req,res,message,statusCode:401})
}