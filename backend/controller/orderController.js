import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// des Create new oder
// route POST /api/orders
// access Private
const addOrderItems = asyncHandler(async (req, res) => {
    // console.log('addorderitem called')
    // res.send('ordered')
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  console.log(req.user._id)
  if(orderItems&& orderItems.length===0){
    res.status(400)
    throw new Error('Your cart is empty!')
    return
  }
  else{
    // console.log(`called in orderController ${req.user._id}`)
    const order=new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder=await order.save()
    res.status(201)
    res.json(createdOrder)
  }
})
// des Get Order by id
// route GET /api/orders/:id
// access Private
const getOrderById = asyncHandler(async (req, res) => {
 const order=await Order.findById(req.params.id).populate('user','name email')

 if(order){
  res.json(order)
 }
 else{
  res.status(404)
  throw new Error('Order not found')
 }
})
export{
    addOrderItems,
    getOrderById
}
