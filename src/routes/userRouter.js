const router = require('express').Router()
const fileuploader = require('../../middleware/Fileuploder')
  
const { 
    allUserGetController,
    paginationController,
    uniqueUserGetController,
    userRegisterController,
    userLoginController,
    userDeleteController,
    userParmanentDeleteController,
    userUpdateController,
    addressUpdateController,
    forgotPasswordController,
    passwordResetController,
    passwordUpdateController,
                } = require('../controllers/userController')

    const Auth = require('../../middleware/auth')
    const permission = require('../../middleware/permission')

    router.get('/alluser',Auth,  allUserGetController)
    router.get('/users', paginationController)
    router.get('/get-users:page', paginationController)
    router.get('/', Auth,permission([librarian,admin,superAdmin]), uniqueUserGetController)

    router.post('/register',fileuploader.single('image'), userRegisterController)  
    router.post('/login', userLoginController)

    router.delete('/delete/:id', Auth, permission([librarian,admin,superAdmin]),userDeleteController)
    router.delete('/delete-permanent/:id', Auth, permission([librarian,admin,superAdmin]),userParmanentDeleteController)
    
    router.put('/update/:id', Auth, userUpdateController)
    router.put('/address-update/:id', Auth, addressUpdateController)
    router.put('/forgot-password/:id', Auth, forgotPasswordController)

    router.put('/reset-password/:id', Auth, passwordResetController)
    router.put('/password-update/:id', Auth, passwordUpdateController)


module.exports =router