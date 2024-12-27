
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    status:{
        type:String,
        default:"inactive"
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index : 1
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },

    refreshJWT: {
      type: String,
    },
  },
  { timestamps: true }
)




export default mongoose.model("User",userSchema) // users