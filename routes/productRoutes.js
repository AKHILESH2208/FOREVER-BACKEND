import express, { Router } from "express"
import adminAuth from "../middleware/adminAuth.js"
import {listProducts,addProduct,removeProduct,singleProduct} from '../controllers/productController.js'
import upload from "../middleware/multer.js"

const productRouter=Router()

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},
    {name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)
productRouter.delete('/remove/:id',adminAuth,removeProduct)
productRouter.get('/single',singleProduct)
productRouter.get('/list',listProducts)

export default productRouter