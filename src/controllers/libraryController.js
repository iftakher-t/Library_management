// const { required } = require("joi")

const Library = require('../models/Book')

const createLibraryController = async (req ,res)=>{
    try{
        console.log(req.files.bookImage[0].fileName)
        const library = new Library({
            ...req.body,
            bookImage:req.files.bookImage[0].filename,
            bookFile:req.files.bookFile[0].filename,
             })

        let data = await library.save();
            res.status(201).json({
                message: 'book added successfully',
                data,
            })

    }catch(err){
        res.status(500).json({ err })
    }
}


const allBookGetController = async (req ,res)=>{
    try{
        const data = await Library.find();
            res.status(200).json({
                result : data
            })

    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const uniqueBookGetController = async (req ,res)=>{
    try{
        const data = await Library.find({_id:req.params.id});
            res.status(200).json({
                result : data
            })

    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

// const oneBookInsertController = async (req ,res)=>{
//     try{
//    const library = new Library(req.body)
//         const data = await Library.save(req.body);
//             res.status(200).json({
//                 result : data
//             })

//     }catch(err){
//         res.status(500).json({
//             message : "server error",
//             err
//         })
//     }
// }
const manyBookInsertController = async (req ,res)=>{
    try{
        const data = await Library.insertMany(req.body);
            res.status(200).json({
                result : data
            })

    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const bookDeleteController = async (req ,res)=>{
    try{
        const data = await Library.insertMany({_id:req.params.id});
            res.status(200).json({
                result : data
            })

    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}

const bookImageGetController = async (req ,res)=>{
    try{
        const data = await Library.find().select('bookImage bookName');
            res.json({
             data
            })

    }catch(err){
        res.status(500).json({
            message : "server error",
            err
        })
    }
}


module.exports = {
    createLibraryController,
    allBookGetController,
    uniqueBookGetController,
    oneBookInsertController,
    manyBookInsertController,
    bookDeleteController,
    bookImageGetController,
}