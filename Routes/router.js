// import express
const express = require('express')

// create router for express
const router = new express.Router()

const userController = require('../Controller/userController')


// import multer upload config
const upload = require('../multerConfig/storageConfig')

// define routes for each http request
router.post('/employee/register',upload.single('user_profile'),userController.register)

//define routes for get all users
router.get('/employee/get-all-employee-details',userController.getusers)

// degine route to view profile
router.get('/employee/view-profile/:id',userController.viewprofile)

// defien route to delte user
router.delete('/employee/delete-user/:id',userController.deleteUser)

// define route to update user
router.put('/employee/update/:id',userController.editUser)

// export router
module.exports = router
