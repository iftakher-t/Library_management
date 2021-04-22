const {Schema, model}= require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    
    userName:String,

    userType:{ type:String, default:"student", enum : ["student","teacher","librarian"] },
    
    isActive:{ type: String, status:["Active","Inactive"], default:"Inactive" },

    address:{ division : String, destrict : String, upozila : String, zipcode : String,  area : String },

    email:{ type:String, unique:true },

    password: String,
    
    repassword: String,

    profileImage: String,

    resetLink : { String , default :'' }
    
})

userSchema.pre('save', function(next){
    var user = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10,function(err, salt){
            if(err){
                return next(err)
            }
            bcrypt.hash(user.password, salt , function(err,hash){
                if(err){
                    return next(err)
                }
                if(hash){
                    user.password = hash
                }
                next()
            })
        })
    }else{
        next()
    }
}) 

module.exports = model('User',userSchema)



// const passwordChangeController = async (req,res) => {
//     try{
//         const passwordValidator = Joi.object({
//             password: Joi.string().required().pattern(new RegExp ('^[a-zA-Z0-9]{8,30}$'))
//         })//validator the password
//         const {error} = passwordValidator.validate(req.body)
//         if(error){
//             res.json({
//                 message: "validation error",
//                 error
//             })
//         }else{
//             const {id} = req.params;
//             const {password} = req.body;
//             const hash = await bcrypt.hash(password, 10)
//             await User.findByIdAndUpdate(
//                 {_id : id},
//                 {
//                     $set: {
//                         password: hash
//                     }
//                 }
//             )
//             return res.json({
//                 message: "password has been changed"
//             })
//         }
//     }
//     catch(err){
//         res.json({
//             err
//         })
//     }
// }
