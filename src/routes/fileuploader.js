
const router = require('express').Router()
const { fileUplodeController } = require('../controllers/FileUplodeController')
const fileuploader = require('../../middleware/Fileuploder')

router.post('/single' , fileuploader.single('image'), fileUplodeController)