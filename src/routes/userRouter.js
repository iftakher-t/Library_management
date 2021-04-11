const router = require('express').Router()
const fileuploader = require('../../middleware/Fileuploder')
  
const { 
    allUserGetController,
    uniqueUserGetController,
    userRegisterController,
    userLoginController,
    // adminController,
    userDeleteController,
            } = require('../controllers/userController')

    router.get('/', allUserGetController)
    router.get('/', uniqueUserGetController)

    router.post('/register',fileuploader.single('image'), userRegisterController)  
    router.post('/login', userLoginController)
    // router.post('/', adminController)


    router.get('/:id', userDeleteController)


module.exports =router