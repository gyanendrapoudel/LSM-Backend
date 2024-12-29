import mongoose from 'mongoose'


const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      require:true
    },
    association: {
      type: String,
    },
    expire:{
        type:Date,
        default: new Date(Date.now()+3600000),
        expires:0
        
    }
  },
  { timestamps: true }
)

export default mongoose.model("Session",sessionSchema) // sessions collection 