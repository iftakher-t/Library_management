
const router = require ('express').Router()
const fileUpLoader = require('../../middleware/fileUpLoader')

const { 
    createLibraryController,
    allBookGetController,
    uniqueBookGetController,
    oneBookInsertController,
    manyBookInsertController,
    bookDeleteController,
    bookImageGetController
    } = require('../controllers/bookController')

    router.get('/',fileUpLoader.fields([{'bookimage'}]) createLibraryController)
    router.get('/', allBookGetController)
    router.get('/:id', uniqueBookGetController)
    router.get('/book-images', bookImageGetController)

    router.post('/bookentry', oneBookInsertController)
    router.post('/bookentry', manyBookInsertController)


    router.delete('/bookdelete/:id', bookDeleteController)


module.exports =router