const {Schema, model}= require('mongoose')

const userSchema = new Schema({
    
    userName:String,

    userType:{ type:String,
    enum : ["student","teacher","librarian"],
    default:"student"
    },

    isActive:{
        type: String,
        status:["Active","Inactive"],
        default:"Inactive"
    },

    email:{ 
        type:String, unique:true
    },

    password: String,
    
    repassword: String,

    profileImage: String,

    
})

module.exports = model('User',userSchema)
