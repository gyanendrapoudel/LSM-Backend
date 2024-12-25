import express from "express"
const app = express()
import mongoose from "mongoose"


// Reading env variable
// import dotenv from 'dotenv'
// dotenv.config()

const PORT = process.env.PORT || 8000

// db config
import { dbConnection } from './config/dbConfig.js'
dbConnection();


app.use('/user', (req, res) => {
  res.json({
    message: 'hello from router',
  })
})


app.listen(PORT, ()=>{
    console.log(`app is listening on ${PORT} `)
})