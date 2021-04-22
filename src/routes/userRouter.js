const router = require('express').Router()
const fileuploader = require('../../middleware/Fileuploder')
  
const { 
    allUserGetController,
    paginationController,
    uniqueUserGetController,
    userRegisterController,
    userLoginController,
    
    userDeleteController,

    userUpdateController,
    passwordResetController,
    addressUpdateController,
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
    router.delete('/delete-permanent/:id', Auth, permission([librarian,admin,superAdmin]),userDeleteController)
    
    router.put('/update/:id', Auth, userUpdateController)
    router.put('/address-update/:id', Auth, addressUpdateController)

    router.put('/reset-password/:id', Auth, passwordResetController)


module.exports =router