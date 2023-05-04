const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const {
    getAllUsers,
    getAllTrainers,
    getSingleUser,
    getSingleTrainer,
    showCurrentUser,
    updateUser,
    updateUserStatus,
    updateUserPassword,
    deleteUser,
    getUserStatusStats,
} = require('../controllers/userController')

router.route('/').get(authenticateUser, authorizePermissions('admin', 'trainer'), getAllUsers)

router.route('/trainers').get(authenticateUser, getAllTrainers)
router.route('/trainers/:id').get(authenticateUser, getSingleTrainer)

router.route('/showMe').get(authenticateUser, showCurrentUser)

router.route('/stats/status').get(authenticateUser, authorizePermissions('admin'), getUserStatusStats)

router.route('/updateUser/:id').patch(authenticateUser, updateUser)
router.route('/updateUserStatus/:id').patch(authenticateUser, authorizePermissions('admin'), updateUserStatus)
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword)

router.route('/:id').get(authenticateUser, getSingleUser)
router.route('/:id').delete(authenticateUser, authorizePermissions('admin'), deleteUser)

module.exports = router
