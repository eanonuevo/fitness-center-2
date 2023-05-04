const Membership = require('../models/Membership')
const moment = require('moment')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const sgMail = require('@sendgrid/mail')
const { response } = require('express')

const getPendingMemberships = async (req, res) => {
    const memberships = await Membership.find({ status: 'pending' }).sort({ createdAt: -1 })
    res.status(StatusCodes.OK).json({ memberships })
}

const getApprovedMemberships = async (req, res) => {
    const memberships = await Membership.find({ status: 'approved' }).sort({ validity: 1 })
    res.status(StatusCodes.OK).json({ memberships })
}

const getPendingMembership = async (req, res) => {
    const { id: userId } = req.params

    const pending = await Membership.findOne({ user: userId, status: 'pending' })
    
    if (!pending) {
        throw new CustomError.NotFoundError(`No pending membership with id : ${userId}`)
    }

    res.status(StatusCodes.OK).json({ pending })
}

const updatePendingMembership = async (req, res) => {
    const { id: membershipId } = req.params

    const membership = await Membership.findOneAndUpdate(
        { _id: membershipId },
        req.body,
        { new: true, runValidators: true }
    )

    if (!membership) {
        throw new CustomError.NotFoundError(`No plan with id : ${membershipId}`)
    }

    res.status(StatusCodes.OK).json({ membership })
}

const cancelPendingMembership = async (req, res) => {
    const { id: membershipId } = req.params

    const membership = await Membership.findOne({ _id: membershipId })
    
    if (!membership) {
        throw new CustomError.NotFoundError(`No plan with id : ${membershipId}`)
    }

    await membership.remove()
    res.status(StatusCodes.OK).json({ msg: 'Success! Membership cancelled.' });
}

const getUserMemberships = async (req, res) => {
    const { id: userId } = req.params

    const memberships = await Membership.find({ user: userId }).sort({ createdAt: -1 })

    if (!memberships) {
        throw new CustomError.NotFoundError(`No membership user id : ${userId}`)
    }

    res.status(StatusCodes.OK).json({ memberships })
}

const createMembership = async (req, res) => {
    req.body.user = req.user.userId
    const membership = await Membership.create(req.body)
    res.status(StatusCodes.CREATED).json({ membership })
}

// sending approved memberships
const approvedMembership = async (req, res) => {
    const { id: membershipId } = req.params
    const { status } = req.body

    if (!status) {
        throw new CustomError.BadRequestError('Please provide membership status')
    }

    const membership = await Membership.findOneAndUpdate(
        { _id: membershipId },
        { status },
        { new: true, runValidators: true }
    )

    // send email
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: membership.email,
        from: {name: 'Fitness Center System', email: 'fitness.center.project@gmail.com'},
        subject: 'Approved Membership',
        text: 'Your membership application has been approved',
        html: `
                <div>
                    <p>Hello, ${membership.firstName} ${membership.lastName}.</p>
                    </br>
                    <p>
                        Your membership application you submitted in ${moment(membership.createdAt).format('MMMM Do YYYY, h:mm:ss a' )} with plan of ${membership.name} has been <strong>APPROVED</strong>. Your approved membership is valid until ${moment(membership.validity).format('MMMM Do YYYY')}.
                    </p>
                    </br>
                    <p>
                        Please login with your account to know more about your membership. Thank you and keep grinding.
                    </p>
                    </br>
                    </br>
                    <p>Fitness Center</p>
                </div>
              `,
    }
    
    const info = await sgMail.send(msg)

    response.status(StatusCodes.OK).json({ msg: 'Approved email sent!', info })
}
// sending rejected memberships
const rejectedMembership = async (req, res) => {
    const { id: membershipId } = req.params
    const { status } = req.body

    if (!status) {
        throw new CustomError.BadRequestError('Please provide membership status')
    }

    const membership = await Membership.findOneAndUpdate(
        { _id: membershipId },
        { status },
        { new: true, runValidators: true }
    )

    // send email
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: membership.email,
        from: {name: 'Fitness Center System', email: 'fitness.center.project@gmail.com'},
        subject: 'Rejected Membership',
        text: 'Your membership application has been rejected',
        html: `
                <div>
                    <p>Hello, ${membership.firstName} ${membership.lastName}.</p>
                    </br>
                    <p>
                        Your membership application you submitted in ${moment(membership.createdAt).format('MMMM Do YYYY, h:mm:ss a' )} with plan of ${membership.name} has been <strong>REJECTED</strong>.
                    </p>
                    </br>
                    <p>
                        Please login with your account to know more about your membership. Thank you and keep grinding.
                    </p>
                    </br>
                    </br>
                    <p>Fitness Center</p>
                </div>
              `,
    }
    
    const info = await sgMail.send(msg)

    response.status(StatusCodes.OK).json({ msg: 'Rejected email sent!', info })
}

// sending expired memberships
const expiredMembership = async (req, res) => {
    const { id: membershipId } = req.params
    const { status } = req.body

    if (!status) {
        throw new CustomError.BadRequestError('Please provide membership status')
    }

    // const target = await Membership.findOne({ _id: membershipId })

    // let expiredIn = new Date(target.validity)
    // let currentDate = new Date()

    // if (expiredIn > currentDate) {
    //     throw new CustomError.BadRequestError(`The validity is not beyond the current date ${moment().format('MMMM D YYYY')}`)
    // }

    const membership = await Membership.findOneAndUpdate(
        { _id: membershipId },
        { status },
        { new: true, runValidators: true }
    )

    // send email
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: membership.email,
        from: {name: 'Fitness Center System', email: 'fitness.center.project@gmail.com'},
        subject: 'Expired Membership',
        text: 'Your membership application has been expired',
        html: `
                <div>
                    <p>Hello, ${membership.firstName} ${membership.lastName}.</p>
                    </br>
                    <p>
                        Your membership plan of ${membership.name} with validity of ${moment(membership.startingDate).format('MMMM D YYYY')} to ${moment(membership.validity).format('MMMM D YYYY')} has been <strong>EXPIRED</strong>.
                    </p>
                    </br>
                    <p>
                        Please login with your account to know more about your membership. Thank you and keep grinding.
                    </p>
                    </br>
                    </br>
                    <p>Fitness Center</p>
                </div>
              `,
    }
    
    const info = await sgMail.send(msg)

    response.status(StatusCodes.OK).json({ msg: 'Expired email sent!'})
}

const updateMembership = async (req, res) => {
    const { id: membershipId } = req.params
    const { status } = req.body

    if (!status) {
        throw new CustomError.BadRequestError('Please provide membership status')
    }

    const membership = await Membership.findOneAndUpdate(
        { _id: membershipId },
        { status },
        { new: true, runValidators: true }
    )

    res.status(StatusCodes.OK).json({ membership })
}

const deleteMembership = async (req, res) => {
    const { id: membershipId } = req.params;

    const membership = await Membership.findOne({ _id: membershipId });

    if (!membership) {
        throw new CustomError.NotFoundError(`No plan with id : ${membershipId}`);
    }

    await membership.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! Plan removed.' });
}

const getMembershipStatusStats = async (req, res) => {
    let stats = await Membership.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } || 0 } },
    ])

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr
        acc[title] = count
        return acc
    }, {})

    const defaultStats = {
        pending: stats.pending || 0,
        approved: stats.approved || 0,
        rejected: stats.rejected || 0,
        expired: stats.expired || 0,
    }

    res.status(StatusCodes.OK).json({ defaultStats })
}

const getTotalIncome = async (req, res) => {
    let stats = await Membership.aggregate([
        { $match: { status: { $in: ['approved', 'expired'] } } },
        { $group: { _id: "approved", total: { $sum: "$price" } } }
    ])

    stats = stats.reduce((acc, curr) => {
        const { _id: title, total } = curr
        acc[title] = total
        return acc
    }, {})

    const totalIncome = {
        approved: stats.approved || 0,
    }

    res.status(StatusCodes.OK).json({ totalIncome })
}

module.exports = {
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
}