import express from 'express'
import { createUser } from '../models/user/UserModel.js'
import { insertNewUser, activeNewUser } from '../controllers/authController.js'
import { newUserDataValidation } from '../middleware/validation/authDataValidation.js'


const router = express.Router()

router.post('/register', newUserDataValidation, insertNewUser)

// activate-user 

router.post('/activate-user', activeNewUser)


export default router

