const Review = require('../models/Review')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const getAllReviews = async (req, res) => {
    const reviews = await Review.find({})
    res.status(StatusCodes.OK).json({ reviews })
}

const getSingleReview = async (req, res) => {
    const { id: memberId } = req.params 
    const review = await Review.findOne({ user: memberId })

    if(!review) {
        throw new CustomError.NotFoundError(`There is no review from user with id ${memberId}`)
    }

    res.status(StatusCodes.OK).json({ review })
}

const createReview = async (req, res) => {
    req.body.user = req.user.userId
    const { rating, comment } = req.body

    if (!rating || !comment) {
        throw new CustomError.BadRequestError('Please provide rating and comment')
    }

    isOnlyReview = await Review.countDocuments({ user: req.user.userId }) >= 1
    if (isOnlyReview) {
        throw new CustomError.BadRequestError('Each member can only have one review only')
    }

    const review = await Review.create(req.body)

    res.status(StatusCodes.CREATED).json({ review })
}

const updateReview = async (req, res) => {
    const { id: reviewId } = req.params
    const review = await Review.findOneAndUpdate({ _id: reviewId }, req.body, {
        new: true,
        runValidators: true,
    });

    if (!review) {
        throw new CustomError.NotFoundError(`No plan with id : ${reviewId}`)
    }

    res.status(StatusCodes.OK).json({ review })
}

const deleteReview = async (req, res) => {
     const { id: reviewId } = req.params;

    const review = await Review.findOne({ _id: reviewId });

    if (!review) {
        throw new CustomError.NotFoundError(`No plan with id : ${reviewId}`);
    }

    await review.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! Review removed.' });
}

const getAverageRating = async (req, res) => {
    let stats = await Review.aggregate([
        { $group: { _id: 'average', average: { $avg: "$rating" }  } },
    ])

    stats = stats.reduce((acc, curr) => {
        const { _id: title, average } = curr
        acc[title] = average
        return acc
    }, {})

    const averageRating = {
        rating: stats.average.toFixed(1) || 0,
    }

    res.status(StatusCodes.OK).json({ averageRating })
}

const getTotalReviews = async (req, res) => {
    let stats = await Review.count()
    
    res.status(StatusCodes.OK).json({ stats })
}

module.exports = {
    getAllReviews,
    getSingleReview,
    createReview,
    updateReview,
    deleteReview,
    getAverageRating,
    getTotalReviews,
}