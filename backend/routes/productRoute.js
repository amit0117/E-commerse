import express from 'express'

import { getProduct,getProductById } from '../controller/productController.js'
const router=express.Router()

router.get('/',getProduct)
router.get('/:id',getProductById)
export default router