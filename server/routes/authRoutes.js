import express from "express"
import { refresh, login, logoutUser } from "../controllers/authController.js"

const router = express.Router()

//authRoutes.js
router.post('/', login)
router.get('/refresh', refresh)
router.post('/logout', logoutUser)

export default router