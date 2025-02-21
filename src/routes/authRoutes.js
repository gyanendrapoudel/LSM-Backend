import express from 'express'
import { createUser } from '../models/user/UserModel.js'
import {
  insertNewUser,
  activeNewUser,
  loginUser,
  renewAccessToken,
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

// renew JWT
router.get('/renew-jwt',renewAccessToken )
export default router

