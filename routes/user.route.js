const express = require('express');
const userController = require('../controllers/user.controller')

const router = express.Router();

router.get('/random', userController.getRandomUsers)
router.get('/all', userController.getAllUsers)
router.post('/save', userController.saveUser)
router.patch("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);



module.exports = router;