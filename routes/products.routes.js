import express from 'express';
import { create, deleteProduct, getProductById, getProducts, getProductsByName, getProductsByType, updateProduct } from '../controllers/products.controller.js';
import tokenverification from '../middleware/jwt.js'



const router = express.Router()

router.post('/createProduct', create)
router.put('/updateProduct/:id', updateProduct)
router.delete('/deleteProduct/:id', deleteProduct)
router.get('/products', getProducts)
router.get('/product/:id', getProductById)
router.get('/products/:type', getProductsByType)
router.get('getProductsByName/:name?', getProductsByName)




export default router