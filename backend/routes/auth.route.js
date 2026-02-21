import express from 'express'
import { adminLogin, adminSignUp, userLogin, userSignup } from '../controller/auth.controller.js'

const router = express.Router()

router.post('/admin/signup', adminSignUp)
router.post('/admin/login', adminLogin)
router.post('/user/signup', userSignup)
router.post('/user/login', userLogin)


export default router;