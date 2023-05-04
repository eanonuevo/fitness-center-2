const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')
const {
    getPendingMemberships,
    getApprovedMemberships,
    getUserMemberships,
    createMembership,
    updateMembership,
    deleteMembership,
    getMembershipStatusStats,
    getTotalIncome,
    approvedMembership,
    rejectedMembership,
    expiredMembership,
    getPendingMembership,
    updatePendingMembership,
    cancelPendingMembership,
} = require('../controllers/membershipController')

router.route('/').post(authenticateUser, authorizePermissions('user'), createMembership)
// email sending
router.route('/email/approved/:id').patch(authenticateUser, authorizePermissions('admin'), approvedMembership)
router.route('/email/rejected/:id').patch(authenticateUser, authorizePermissions('admin'), rejectedMembership)
router.route('/email/expired/:id').patch(authenticateUser, authorizePermissions('admin'), expiredMembership)

router.route('/pendingUser/:id').get(authenticateUser, getPendingMembership)
router
    .route('/pendingUser/:id')
    .patch(authenticateUser, updatePendingMembership)
    .delete(authenticateUser, cancelPendingMembership)

router.route('/pending').get(authenticateUser, authorizePermissions('admin'), getPendingMemberships)

router.route('/approved').get(authenticateUser, authorizePermissions('admin'), getApprovedMemberships)

router.route('/stats/status').get(authenticateUser, authorizePermissions('admin'), getMembershipStatusStats)
router.route('/stats/income').get(authenticateUser, authorizePermissions('admin'), getTotalIncome)
    

router
    .route('/:id')
    .get(authenticateUser, getUserMemberships)
    .patch(authenticateUser, authorizePermissions('admin'), updateMembership)
    .delete(authenticateUser, authorizePermissions('admin'), deleteMembership)

module.exports = router
