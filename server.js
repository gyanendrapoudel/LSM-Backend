import express from "express"
const app = express()
import authRouter from './src/routes/authRoutes.js'

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
import { dbConnection } from './src/config/dbConfig.js'
import { errorHandler } from "./src/middleware/errorHandler.js"
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


// user api end point
app.use('/api/v1/auth',authRouter)




app.use('/user', (req, res) => {
  res.json({
    message: 'hello from router',
  })
})

app.use(errorHandler)
