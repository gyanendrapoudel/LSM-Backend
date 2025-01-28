import express from 'express'
import { createUser } from '../models/user/UserModel.js'
import {
  insertNewUser,
  activeNewUser,
  loginUser,
} from '../controllers/authController.js'
import {
  newUserDataValidation,
  activationDataValidation,
  loginDataValidation,
} from '../middleware/validation/authDataValidation.js'


const router = express.Router()

router.post('/register', newUserDataValidation, insertNewUser)

// activate-user 

router.post('/activate-user', activationDataValidation, activeNewUser)

// login user
router.post('/login', loginDataValidation, loginUser)

export default router

