import express from "express"
const app = express()
import mongoose from "mongoose"


// Reading env variable
// import dotenv from 'dotenv'
// dotenv.config()

const PORT = process.env.PORT || 8000

// db config
import { dbConnection } from './config/dbConfig.js'
    dbConnection()
      .then(() => {
        console.log('DB Connected')
        app.listen(PORT, () => {
          console.log(`app is listening on ${PORT} `)
        })
      })
      .catch((error) => {
        console.log('Error occurred', error)
      })


app.use('/user', (req, res) => {
  res.json({
    message: 'hello from router',
  })
})


