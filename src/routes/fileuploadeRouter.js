
const router = require('express').Router()

const {  
    singleUplodeController,
    multipleUplodeController } = require('../controllers/fileUplodeController')
const fileuploader = require('../../middleware/Fileuploder')

router.post('/single' , fileuploader.single('image'), singleUplodeController)
router.post('/many' , fileuploader.array('image',3), multipleUplodeController)

module.exports = router