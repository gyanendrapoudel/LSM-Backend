import userSchema from "./UserSchema.js";

export const createUser = (obj)=>{
    return userSchema(obj).save()
}