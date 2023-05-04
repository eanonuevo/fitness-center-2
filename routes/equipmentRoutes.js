const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')
const {
    createEquipment,
    getAllEquipment,
    getSingleEquipment,
    updateEquipment,
    deleteEquipment,
    getTotalEquipment,
} = require('../controllers/equipmentController')

router
    .route('/')
    .get(getAllEquipment)
    .post(authenticateUser, authorizePermissions('admin'), createEquipment)

router.route('/stats/total').get(authenticateUser, authorizePermissions('admin'), getTotalEquipment)

router
    .route('/:id')
    .get(getSingleEquipment)
    .patch(authenticateUser, authorizePermissions('admin'), updateEquipment)
    .delete(authenticateUser, authorizePermissions('admin'), deleteEquipment)

module.exports = router
