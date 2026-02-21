import express from 'express'
import { fetchProduct, uploadProduct, deleteProduct } from '../controller/product.controller.js';
import upload from '../middleware/upload.js';

const router = express.Router()

router.post('/product/upload', upload, uploadProduct)
router.get('/product/all-products', fetchProduct)
router.delete('/product/remove-product/:id', deleteProduct)


export default router;