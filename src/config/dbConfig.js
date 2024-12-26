import mongoose from "mongoose";


// export const dbConnection = async () => {
//   try {
//     if (!process.env.MONGO_URI) {
//       throw new Error('Please provide DB Connection string')
//     }
//     const conn = await mongoose.connect(process.env.MONGO_URI)
//     conn && console.log('Connection successful')
//   } catch (error) {
//     console.log(error)
//   }
// }

// another way
export const dbConnection = ()=>{
    return mongoose.connect(process.env.MONGO_URI)
}
