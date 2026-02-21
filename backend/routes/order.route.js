import express from 'express'
import { uploadProduct } from '../controller/order.controller.js';

const router = express.Router()

router.post('/order/create', uploadProduct)
// router.get('/product/all-products', fetchProduct)
// router.delete('/product/remove-product/:id', deleteProduct)


export default router;