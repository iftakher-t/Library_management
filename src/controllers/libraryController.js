// const { required } = require("joi")

const Library = require('../models/Library')

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

const oneBookInsertController = async (req ,res)=>{
    try{
        const data = await Library.save(req.body);
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

module.exports = {
    allBookGetController,
    uniqueBookGetController,
    oneBookInsertController,
    manyBookInsertController,
    bookDeleteController,
}