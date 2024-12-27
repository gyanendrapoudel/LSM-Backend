import express from 'express'
import { createUser } from '../models/user/UserModel.js'
import { insertNewUser } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', insertNewUser)




export default router

