import express from "express";
import multer from 'multer'
import path from 'path'
import pkg from 'cloudinary'
const cloudinary=pkg
import asyncHandler from 'express-async-handler'
const router=express.Router()

const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/')
    },
    filename(req,file,cb){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
// may get checkFileTypes from stackOverflow
function checkFileTypes(file,cb){
    const filetypes=/jpg|jpeg|png /
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype=filetypes.test(file.mimetype)
    if(extname&&mimetype){
        return cb(null,true)
    }
    else {
        cb('Only images(jpg,jpeg,png) are allowed.')
    }
}

const upload=multer({
    storage,
    fileFilter:function(req,file,cb){
        checkFileTypes(file,cb)
    }
})

// router.post('/',upload.single('image'),(req,res)=>{
//     // res.send(`/${req.file.path}`)
// })
router.post('/',upload.single('image'),asyncHandler(async(req,res)=>{
    const uploadPhoto=await cloudinary.uploader.upload(`${req.file.path}`)
    // console.log(`called in uploadRoute`)
    // console.log(uploadPhoto)
    res.send(uploadPhoto.url)
}))

export default router