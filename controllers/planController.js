const Plan = require('../models/Plan')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const getAllPlans = async (req, res) => {
    const plans = await Plan.find({})
    res.status(StatusCodes.OK).json({ count: plans.length, plans })
}

const getSinglePlan = async (req, res) => {
    const { id: planId } = req.params 
    const plan = await Plan.findOne({ _id: planId })

    if(!plan) {
        throw new CustomError.NotFoundError(`No plan with id ${planId}`)
    }

    res.status(StatusCodes.OK).json({ plan })
}

const createPlan = async (req, res) => {
    req.body.user = req.user.userId 
    const plan = await Plan.create(req.body)
    res.status(StatusCodes.CREATED).json({ plan })
}

const updatePlan = async (req, res) => {
    const { id: planId } = req.params
    const plan = await Plan.findOneAndUpdate({ _id: planId }, req.body, {
        new: true,
        runValidators: true,
    });

    if (!plan) {
        throw new CustomError.NotFoundError(`No plan with id : ${planId}`)
    }

    res.status(StatusCodes.OK).json({ plan })
}

const deletePlan = async (req, res) => {
    const { id: planId } = req.params;

    const plan = await Plan.findOne({ _id: planId });

    if (!plan) {
        throw new CustomError.NotFoundError(`No plan with id : ${planId}`);
    }

    await plan.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! Plan removed.' });
}

const getTotalPlan = async (req, res) => {
    let stats = await Plan.count()
    
    res.status(StatusCodes.OK).json({ stats })
}

module.exports = {
    getAllPlans,
    getSinglePlan,
    createPlan,
    updatePlan,
    deletePlan,
    getTotalPlan,
}
