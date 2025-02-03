import { responseClient } from "../middleware/responseClient.js"
import { getSession } from "../models/session/SessionModel.js"
import { getUserByEmail } from "../models/user/UserModel.js"
import { decodeAccessJWT } from "../utils/jwt.js"

export const getUserProfile = async (req,res,next)=>{
    const user = req.userInfo
    user.password = undefined
    user.__v = undefined

 return responseClient({
   req,
   res,
   message: 'User Profile',
   jwts: user,
 })
}