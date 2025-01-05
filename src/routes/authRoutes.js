import express from 'express'
import { createUser } from '../models/user/UserModel.js'
import { insertNewUser, activeNewUser } from '../controllers/authController.js'


const router = express.Router()

router.post('/register', insertNewUser)

// activate-user 

router.post('/activate-user', activeNewUser)


export default router

