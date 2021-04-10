const path = require ('path')
const multer = require('multer');

// Set storage engine
const fileStorage = multer.diskStorage({
    destination : './public/uploads/',
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
        const extName = filetypes.test(path.extname(file.orginalname).toLoewrCase())
        // check mime type
        const mimeType = filetypes.test(file.mimetype)
        if(extName && mimeType){
           return cb(null,true)
        }else{
            cb(new Error('Only Support Image'))
        }
    }
}).single('avater')