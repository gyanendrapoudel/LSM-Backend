import express from 'express'
import { getUserProfile } from '../controllers/userController.js'
import { userAuthMiddleware } from '../middleware/userAuthMiddleware.js'
const router = express.Router()

router.get('/profile', userAuthMiddleware,getUserProfile)

export default router