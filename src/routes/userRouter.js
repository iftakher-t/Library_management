const router = require('express').Router()

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

    router.post('/register', userRegisterController)
    router.post('/login', userLoginController)
    // router.post('/', adminController)


    router.get('/:id', userDeleteController)


module.exports =router