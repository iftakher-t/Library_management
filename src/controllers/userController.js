const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { userValidator ,options } = require('../../validator/userValidator')


const allUserGetController = async (req,res)=>{
    try{
        const data = await User.find()
        res.status(200).json({
            result: data
        })
    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const uniqueUserGetController = async (req,res)=>{
    try{
        const data = await User.find({_id : req.params.id})
        res.status(200).json({
            result: data
        })
    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const userRegisterController = async (req,res)=>{
    try{
        const {error, value }= userValidator.validate(req.body)
        if(error){
            res.status(500).json({
                result: data,
                message: 'validation error',
                Error: error.details[0].message
            })
        }
        const {userName, userType, isActive, email, password }= req.body

        const hashPass = await bcrypt.hash(password, 10)

        const user = new User({
            userName, userType, isActive, email, hashPass
        })

        const data = await user.save()
            res.status(200).json({
                result: data,
                message: 'user saved successfully'
            })
    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const userLoginController = async (req,res)=>{
    try{
        const {email, password }= req.body

        const user = await User.findOne({ email })
        if(user){
            const isValid = await bcrypt.compare(password, user.password)
            
            let data ={
                userName : user.userName,
                userType : user.userType
            }
            res.status(200).json({
                result: data
            })
        }
    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const userDeleteController = async (req,res)=>{
    try{
        const data = await User.delete({_id : req.params.id})
        res.status(200).json({
            result: data
        })
    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

module.exports = { 
    allUserGetController,
    uniqueUserGetController,
    userRegisterController,
    userLoginController,
    // adminController,
    userDeleteController,
            }