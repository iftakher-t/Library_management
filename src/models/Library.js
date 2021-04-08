const {Schema, model}= require('mongoose')

const librarySchema = new Schema({
    
   bookName: String,

    author: String,

    releaseDate: { type: Date, default: Date.now },//yyyy-mm-dd

    bookImage: String,
    bookFile: String,

    isActivate:{ type: Boolean, default: false},
    
    isDeleted:{ type: Boolean, default: false},    
})

module.exports = model('Library',librarySchema)
