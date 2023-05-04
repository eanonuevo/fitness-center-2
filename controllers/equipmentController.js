const Equipment = require('../models/Equipment')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const createEquipment = async (req, res) => {
    req.body.user = req.user.userId
    const equipment = await Equipment.create(req.body)
    res.status(StatusCodes.CREATED).json({ equipment })
}

const getAllEquipment = async (req, res) => {
    const equipments = await Equipment.find({})
    res.status(StatusCodes.OK).json({ count: equipments.length, equipments })
}

const getSingleEquipment = async (req, res) => {
    const { id: equipmentId } = req.params 
    const equipment = await Equipment.findOne({ _id: equipmentId })

    if(!equipment) {
        throw new CustomError.NotFoundError(`No equipment with id ${equipmentId}`)
    }

    res.status(StatusCodes.OK).json({ equipment })
}

const updateEquipment = async (req, res) => {
    const { id: equipmentId } = req.params
    const equipment = await Equipment.findOneAndUpdate({ _id: equipmentId }, req.body, {
        new: true,
        runValidators: true,
    });

    if (!equipment) {
        throw new CustomError.NotFoundError(`No equipment with id : ${equipmentId}`)
    }

    res.status(StatusCodes.OK).json({ equipment })
}

const deleteEquipment = async (req, res) => {
    const { id: equipmentId } = req.params
    const equipment = await Equipment.findOneAndUpdate({ _id: equipmentId }, req.body, {
        new: true,
        runValidators: true,
    });

    if (!equipment) {
        throw new CustomError.NotFoundError(`No equipment with id : ${equipmentId}`)
    }

    await equipment.remove()
    res.status(StatusCodes.OK).json({ msg: 'Success! Equipment removed' })
}

const getTotalEquipment = async (req, res) => {
    let stats = await Equipment.count()
    
    res.status(StatusCodes.OK).json({ stats })
}

module.exports = {
    createEquipment,
    getAllEquipment,
    getSingleEquipment,
    updateEquipment,
    deleteEquipment,
    getTotalEquipment,
}
