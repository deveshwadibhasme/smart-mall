import express from 'express'
import { fetchProduct, uploadProduct, deleteProduct } from '../controller/product.controller.js';
import upload from '../middleware/upload.js';

const router = express.Router()

router.post('/product/upload', upload, uploadProduct)
router.get('/product/all-products', fetchProduct)
router.delete('/product/remove-product/:id', deleteProduct)
// router.post('/admin/login', adminLogin)
// router.post('/user/signup', userSignup)
// router.post('/user/login', userLogin)


export default router;