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


// creating refreshJWT 
export const createRefreshJWT = async (email)=>{
    const refreshJWT = jwt.sign({ email }, process.env.REFRESH_SECRET,{
        expiresIn:"30d"
    })
    // find the user using email and update the value of refreshJWT

    const user = await updateUser({ email }, { refreshJWT })
    console.log("updated user", user)

}
