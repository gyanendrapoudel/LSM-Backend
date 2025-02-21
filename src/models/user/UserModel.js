import UserSchema from "./UserSchema.js";
import userSchema from "./UserSchema.js";

export const createUser = (obj)=>{
    return userSchema(obj).save()
}

export const updateUserStatus = (filter) => {
  return userSchema.findOneAndUpdate(
    filter,
    { $set: { status: 'active' } },
    { new: true }
  )
}

export const getUserByEmail = (email)=>{
  return UserSchema.findOne({email})
}

export const updateUser = (filter,update)=>{
  return userSchema.findOneAndUpdate(
    filter,update,{new:true}
  )
}
export const getOneUser = (filter)=>{
return userSchema.findOne(filter)
}