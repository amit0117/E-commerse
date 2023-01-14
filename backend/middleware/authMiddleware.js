import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
const protect=asyncHandler(async (req,res,next)=>{
let token
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
{
try{
token=req.headers.authorization.split(' ')[1]
const decoded=jwt.verify(token,process.env.JWT_SECRET)

const createdUser=await User.findById(decoded.id).select('-password')
console.log(`called in authmiddleware ${createdUser._id}`)
req.user=createdUser

next()
}
catch(error){
res.status(401)

throw new Error('Not Authorized ,Token failed')
}
}
if(!token){
    res.status(401)
    throw new Error('Not authorized, No Token !!.')
}
})
export  {protect}