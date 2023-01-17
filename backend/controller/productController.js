import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProduct=asyncHandler(async (req,res)=>{
    // console.log('products called')
const products=await Product.find({})
res.json(products)
})

// des Delete a product
// route DELETE /api/products/:id
// acess Public 
const getProductById=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id)
    
    if(product){
        res.json(product)
    }
    else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})
// des Delete a product
// route DELETE /api/products/:id
// access Private/Admin
const deleteProduct=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id)
    
    if(product){
        await product.remove()
        res.json({message:'Product Deleted'})
    }
    else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})
// des Create a product
// route POST /api/products
// access Private/Admin
const createProduct=asyncHandler(async(req,res)=>{
const product=new Product(({
    name:'Sample name',
    price:0,
    user:req.user._id,
    image:'/image/sample.jpg',
    brand:'sample brand',
    category:'sample category',
    countInStock:2,
    numReviews:0,
    description:'sample description'
}))    
   
 const createdProduct=await product.save()
 res.status(201).json(createdProduct)
})
// des Update a product
// route PUT /api/products/:id
// access Private/Admin
const updateProduct=asyncHandler(async(req,res)=>{
const {name,price,description,image,brand,category,countInStock} =req.body
const product=await Product.findById(req.params.id)
if(product){
   product.name=name
   product.price=price
   product.description=description  
   product.image=image
   product.brand=brand
   product.category=category
   product.countInStock=countInStock
}
else{
    res.status(404)
    throw new Error('Product Not Found')
}
 const updatedProduct=await product.save()
 res.status(201).json(updatedProduct)
})

export {getProduct,getProductById,deleteProduct,createProduct,updateProduct}