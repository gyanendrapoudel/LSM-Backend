import express from 'express'
import { createUser } from '../models/user/UserModel.js'
import { insertNewUser, activeNewUser } from '../controllers/authController.js'
import {
  newUserDataValidation,
  activationDataValidation,
} from '../middleware/validation/authDataValidation.js'


const router = express.Router()

router.post('/register', newUserDataValidation, insertNewUser)

// activate-user 

router.post('/activate-user', activationDataValidation, activeNewUser)


export default router

