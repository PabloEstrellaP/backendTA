import { response } from 'express'
import HousingSector from "../models/mongo/housingSector.js"
import { isHousingSectorTaken } from '../helpers/dbValidator.js'


export const getHousingSector = async (req, res = response) => {
    try{
        const housingSector = await HousingSector.find({ isDelete: false })
        return res.status(200).json({
            ok:true,
            msg: housingSector
        })
    }catch(error){
        return res.status(400).json({
            ok: false,
            msg: error
        })
    }
}
export const getHousingSectorById = async (req, res = response) => {
    try{
        const{ id } = req.params
        const housingSelector = await HousingSector.findById(id)
        if(housingSelector.isDelete == true){
            return res.status(400).json({
                ok: false,
                msg: "HousingSector hasn't been found"
            })
        }return res.status(200).json({
            ok: true,
            msg: housingSelector
        })
    }
    catch (error) {
        return res.status(400).json({
          ok: false,
          msg: error
        })

    }
}
export const addHousingSector = async(req, res = response) => {
    try{
        const{ cost, description, serial, responsableName, originalDate } = req.body
        const isTaken = await isHousingSectorTaken(serial, false)
        if(isTaken){
            return res.status(400).json({
                ok: false,
                msg: 'Serial is used'
            })
        }
        const newHousingSector = new HousingSector({
            serial,
            description,
            originalDate: new Date(originalDate).toISOString(),
            cost,
            responsableName,
            creationDate: new Date().toISOString()
        })
        await newHousingSector.save()
        return res.status(200).json({
            ok: true,
            msg: newHousingSector
        })
        
    }catch (error){
        res.status(400).json({
            ok: false,
            msg: error
        })
    }
}
export const editHousingSector = async (req, res = response) => {
    try{
        const  { id } = req.params
        const{ cost, description, serial, responsableName, originalDate } = req.body

        const isTaken = await isHousingSectorTaken(serial, true, id)
        if(isTaken){
            return res.status(400).json({
                ok: false,
                msg: 'Serial is used'
            })
        }

        const updateHousingSector = await HousingSector.findByIdAndUpdate(id)
        updateHousingSector.cost = cost
        updateHousingSector.description = description
        updateHousingSector.serial = serial
        updateHousingSector.originalDate = new Date(originalDate).toISOString()
        updateHousingSector.responsableName = responsableName
        updateHousingSector.updateDate = new Date().toISOString()

        await updateHousingSector.save()
        return res.status(200).json({
            ok: true,
            msg: updateHousingSector
        })

    }catch (error) {
        res.status(400).json({
          ok: false,
          msg: error
        })
      }
   
}
export const deleteHousingSector = async (req, res = response) => {
    try{
        const { id } = req.params
        const housingSector = await HousingSector.findByIdAndUpdate(id)
        if(housingSector == null){
            return res.status(400).json({
                ok:false,
                msg: "HousingSector hasn't been found"
            })

        }
        housingSector.isDelete = true
        await housingSector.save()
        return res.status(200).json({
            ok: true,
            msg :'HousingSector has been deleted'
    })
    }catch (error) {
        return res.status(400).json({
          ok: false,
          msg: error
        })
      }
}
