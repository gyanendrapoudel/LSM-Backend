import express from "express"
const app = express()


// middleware
import cors from 'cors'
import morgan from 'morgan'
app.use(cors());
app.use(morgan("dev"))
app.use(express.json())

// Reading env variable
// import dotenv from 'dotenv'
// dotenv.config()


const PORT = process.env.PORT || 8000

// db config
import { dbConnection } from './config/dbConfig.js'
    dbConnection()
      .then(() => {
        console.log('DB Connected')
        app.listen(PORT, (error) => {
            error
              ? console.log('Unable to connect DB')
              : console.log(`app is listening on ${PORT} `)
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


