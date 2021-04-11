const multer = require('multer')
const path = require ('path')

// Set storage engine
const fileStorage = multer.diskStorage({
    destination:(req, file, cb)=>{
        // set folder
        cb(null, './images')
    },
    fileName : (req, file, cb)=>{
        cb(null, Date.now()+'-'+file.originalname)
    }
})

const fileuploader = multer({ 
    storage : fileStorage ,
    limits : { fileSize : 1024*1024*5 }
})

module.exports = fileuploader
