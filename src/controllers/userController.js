const User = require('../models/User')
const bcrypt = require('bcrypt')

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