const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')
const {
    getAllReviews,
    getSingleReview,
    createReview,
    updateReview,
    deleteReview,
    getAverageRating,
    getTotalReviews,
} = require('../controllers/reviewController')

router
    .route('/')
    .get(getAllReviews)
    .post(authenticateUser, authorizePermissions('user'), createReview)

router.route('/stats/average').get(getAverageRating)
router.route('/stats/total').get(authenticateUser, authorizePermissions('admin'), getTotalReviews)

router
    .route('/:id')
    .get(authenticateUser, getSingleReview)
    .patch(authenticateUser, authorizePermissions('user'), updateReview)
    .delete(authenticateUser, authorizePermissions('user'), deleteReview)

module.exports = router
