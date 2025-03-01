import jwt from 'jsonwebtoken'
import { createSession } from '../models/session/SessionModel.js'
import { updateUser } from '../models/user/UserModel.js'

// create Access
export const createAccessJWT = async(email)=>{
const token = jwt.sign({ email }, process.env.ACCESSJWT_SECRET, {
    expiresIn:'15min'
})
// insert into session table to store accessJWT
const obj = {
  token,
  expire: new Date(Date.now()+15*60*1000)
  
}

// DB inserting query from session model
    const newSession = await createSession(obj)
    return newSession?._id?token:null
}

// decode Access
export const decodeAccessJWT = (token) => {
 try {
    return jwt.verify(token, process.env.ACCESSJWT_SECRET)
    
 } catch (error) {
    return error.message
 }
}
// creating refreshJWT 
export const createRefreshJWT = async (email)=>{
    const refreshJWT = jwt.sign({ email }, process.env.REFRESH_SECRET,{
        expiresIn:"30d"
    })
    // find the user using email and update the value of refreshJWT

    const user = await updateUser({ email }, { refreshJWT })
    return user?._id? refreshJWT:null
}
// decoding refresh
export const decodeRefreshJWT = (token)=>{
 try {
    return jwt.verify(token, process.env.REFRESH_SECRET)
 } catch (error) {
    return error.message
 }
}

export const getJwts = async(email)=>{
    return {
      accessJWT: await createAccessJWT(email),
      refreshJWT: await createRefreshJWT(email)
    }
}