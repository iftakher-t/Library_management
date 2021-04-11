const {Schema, model}= require('mongoose')

const profileSchema = new Schema({
    
    userName:String,

    email:{ 
        type:String, unique:true
    },

    password: String,
    
    repassword: String,

    profileImage: String,

    
})

module.exports = model('User',profileSchema)
