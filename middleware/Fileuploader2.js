const path = require ('path')
const multer = require('multer');
const fs = require('fs')

// Set storage engine
const fileStorage = multer.diskStorage({
    destination : './public/uploads/',
    // 2nd way..........
    // destination: function (req, file, cb){
    //     // set folder
    //     cb(null, './images')
    // },
    /*

    //3rd way  auto generate derectory ........

    destination : function(req,file, cb){
        var dir = "./uploads"
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }
        cb(null, dir)
    }

 
    */

    filename : (req,file ,cb)=>{
    cb(null, file.fieldname + '-' + Date.now()
     + path.extname(file.originalname))
}
})

// Init upload
const upload = multer({
    storage: storage,
    limits : { fileSize : 1024*1024*5 },
    
    fileFilter: (req, file, cb)=>{
        // check file type
        const filetypes= /jpeg|jpg|png|gif/
        // check ext
        const extName = filetypes.test(path.extName(file.orginalname).toLoewrCase())
        // check mime type
        const mimeType = filetypes.test(file.mimetype)
        if(extName && mimeType){
           return cb(null,true)
        }else{
            cb(new Error('Only Support Image'))
        }
    }
}).single('avater')