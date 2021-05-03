const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { userValidator ,options } = require('../../validator/userValidator')


const allUserGetController = async (req,res)=>{
    try{
        const user = await User.find()
        if(user.length){
            res.status(200).json({
                result: data 
            })
        }else{
            res.status(200).json({
                message: 'No user yet'
            })
        }
    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const paginationController = async (req, res, next)=>{
    try{
        let { page , size} =req.query

        if(!page){
            page= 1
        }
        if(!size){
            size= 5
        }
        const limit = parseInt(size)
        const skip = (page - 1) * size

        // let { page } =req.params
        // const limit = 5
        // const skip =(page -1) * limit

        const users = await User.find().limit(limit).skip(skip)
        res.send(users)
    }catch(err){
        res.status(500).json({
            message : "server error from filter",
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
        console.log('error', error);
        console.log('value', value);
        if(error){
            res.status(500).json({
                result: value,
                message: 'validation error',
                Error: error.details[0].message
            })
        }else{
        const {userName, userType, isActive, email, password , profileImage } = req.body

        // const hashPass = await bcrypt.hash(password, 10)

        const user = new User({
            userName, userType, isActive, email, password , profileImage
        })

        const data = await user.save()
            res.status(200).json({
                result: data,
                message: 'user saved successfully'
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const userLoginController = async (req,res)=>{
    try{
        const {email, password }= req.body
        const secretKey = process.env.JWT_SECRETE;
        const user = await User.findOne({ email })

        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            let data = {
                userName: user.userName,
                userType: user.userType
            }
            const token = jwt.sign(data, secretKey, { expiresIn: '1h' })
            if (isValid) {
                res.json({
                    message: "Login successfull",
                    token
                })
            }
            else {
                res.json({
                    message: "password doesn't match"
                })
            }
        }
        else {
            res.json({
                message: "User not found"
            })
        }
    }
    catch(err){
        console.log("Error: ", error);
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const userDeleteController = async (req,res)=>{
    try{
        const id = req.params.id
        await User.findByIdAndUpdate(
            {_id : id},
            {
                $set : {
                    isDeleted : true
                }
            }
            )
       return  res.status(200).json({
            message: 'user deleted temporary '
        })
    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const userParmanentDeleteController = async (req,res)=>{
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

const userUpdateController = async (req,res)=>{
    try{
        const data = await User.findByIdAndUpdate(
            {_id : req.params.id},
            {$set: req.body},
            {multi : true}
            )
        
        res.status(200).json({
            message: 'user updated',
            updatedResult: user
        })
    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const addressUpdateController = async (req,res)=>{
    try{
        const {address } =req.body
        const id = req.params.id

        const data = await User.findOneAndUpdate(
            {_id:id},

            {
                $set: {
                'adderess.division': address.division
                'adderess.zipCode': address.Zipcode
                }
            }
            )
        
        return res.json({
            message: 'Address updated success'
        })
    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const forgotPasswordController = async (req,res)=>{
    try{
        const secretKey = process.env.JWT_SECRET
        let { email } =req.body
        const user = await User.findOne({email})
        if(!user){
           return res.status(200).json({
            message: 'No user found with this email'
            })
        }
        const token = jwt.sign({_id : user._id}, secretKey, {expiresIn:'5m'})

        await user.updateOne({ resetLink : token})

        // ====================== Nodemailer =========

        // let transporter = nodemailer.createTransport({
        //     service:'gmail',
        //     auth: {
        //         user : 'iftakher.tec@gmail.com',
        //         pass:''
                
        //     }
        // })

        //---------------- 1st stape -------------
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'faustino.king90@ethereal.email',
                pass: '95dN2AhMwsJM7JRdCu'
            }
        });

        //---------------- 2nd stape -------------
        let mailOption = {
            from : '',
            to : user.email,
            subject :'Nodemailer',
            text : token,
            html :'<button> click</button>'
        }
        // ---------------3rd stape------------------

        transporter.sendMail( mailOption , function(err , data){
            if(err){
                return res.json({
                    message : 'email sending fail',
                    err
                })
            }else{
                return res.json({
                    message : 'email has been send successfully' 
            })
        }
        })

    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const passwordResetController = async (req,res)=>{
    try{
        const secretKey = process.env.JWT_SECRET
        let { token, newPassword } = req.body
        var hashPass = await bcrypt.hash(newPassword, 10)

        const isVarified = jwt.varify(token, secretKey)
        
        if(user){
           await user.updateOne({
            password : hashPass,
            resetLink :''
            })
            return res.json({
                message: 'password reset successful'
            })
        }else{
            res.status(200).json({
                message: 'server error '
            })
        }
    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const passwordUpdateController = async (req,res)=>{
    try{
        const id = req.params.id
        const { oldPassword, newPassword , confirmNewPassword } = req.body
        const query = {
            _id : id,
            isDeleted : false
        }
        const user = await User.findOne( query )
        if(user){
            const isValid = await bcrypt.compare(oldPassword, user.Password)

        if( isValid ){
                if(newPassword === confirmNewPassword){
                    var hashPass = await bcrypt.hash(newPassword, 10)
                await User.findOneAndUpdate(
                {_id : id},
                { $set :{
                    password : hashPass
                }
                }
            )
                }else{
                    res.json({
                    message: 'new password and confirmNewPassword dose not match'
                    })
                }
        
            }else{
                res.status(200).json({
                    message: 'Password not match '
                })
            }
        }else{
            res.status(200).json({
                message: 'user not found '
            })
        }
        res.status(200).json({
            message: 'password updated successfully '
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
    paginationController,
    uniqueUserGetController,
    userRegisterController,
    userLoginController,
    userDeleteController,
    userParmanentDeleteController,
    userUpdateController,
    addressUpdateController,
    forgotPasswordController,
    passwordResetController,
    passwordUpdateController,
            }