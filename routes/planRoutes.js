const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')
const {
    getAllPlans,
    getSinglePlan,
    createPlan,
    updatePlan,
    deletePlan,
    getTotalPlan,
} = require('../controllers/planController')

router
    .route('/')
    .get(getAllPlans)
    .post(authenticateUser, authorizePermissions('admin'), createPlan)

router.route('/stats/total').get(authenticateUser,authorizePermissions('admin'), getTotalPlan)

router
    .route('/:id')
    .get(getSinglePlan)
    .patch(authenticateUser, authorizePermissions('admin'), updatePlan)
    .delete(authenticateUser, authorizePermissions('admin'), deletePlan)

module.exports = router
