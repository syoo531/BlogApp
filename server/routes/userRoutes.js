import express from "express"
import { registerUser, getUserProfile, updateUserProfile } from "../controllers/userController.js"
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router()

router.post('/', registerUser) //register
router.get('/profile', verifyJWT, getUserProfile) //myposts
router.put('/profile', verifyJWT, updateUserProfile)
//can also chain > router.route('/profile').get().put()

export default router