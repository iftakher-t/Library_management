
const router = require ('express').Router()
const { 
    allBookGetController,
    uniqueBookGetController,
    oneBookInsertController,
    manyBookInsertController,
    bookDeleteController,
    } = require('../controllers/libraryController')

    router.get('/', allBookGetController)
    router.get('/:id', uniqueBookGetController)

    router.post('/bookentry', oneBookInsertController)
    router.post('/bookentry', manyBookInsertController)


    router.delete('/bookdelete/:id', bookDeleteController)


module.exports =router