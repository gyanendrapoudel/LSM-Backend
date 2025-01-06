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