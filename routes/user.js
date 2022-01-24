const express =  require('express')
const router = express.Router()
const userController = require('../controllers/user')
const adminAuth = require('../middleware/admin')

router.get('/', adminAuth, userController.getAll)
router.post('/signIn', userController.addUser)
router.post('/logIn', userController.getLogIn)
router.get('/:id', adminAuth, userController.getOneUser)
router.patch('/:id', adminAuth, userController.updateOneUser)
router.delete('/', adminAuth, userController.deleteAllUser)
router.delete('/:id', adminAuth, userController.deleteOneUser)

module.exports = router