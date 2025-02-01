import { responseClient } from "../middleware/responseClient.js"
import { getSession } from "../models/session/SessionModel.js"
import { getUserByEmail } from "../models/user/UserModel.js"
import { decodeAccessJWT } from "../utils/jwt.js"

export const getUserProfile = async (req,res,next)=>{
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
         

          return responseClient({
            req,
            res,
            message:"User Profile",
            jwts:user
          })
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