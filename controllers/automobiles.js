import { response } from 'express'
import Automobiles from '../models/mongo/automobiles.js'
import { isAutomobileTaken } from '../helpers/dbValidator.js'

export const getAutomobiles = async (req , res = response) => {

    try{
        const automobile = await Automobiles.find({ isDelete: false }) 
        return res.status(200).json({
            ok: true,
            msg: automobile
        })
    }catch(error){
        return res.status(400).json({
            ok: false,
            msg: error
        })
    }

}
export const getAutomobileById = async (req, res = response) => {
    try{
        const { id } = req.params
        const automobile = await Automobiles.findById(id)
        if(automobile.isDelete == true){
            return res.status(400).json({
                ok: false,
                msg: "Automobile hasn't been found"
            })
        }
        return res.status(200).json({
            ok: true,
            msg: automobile
        })
            
    } catch (error) {
        return res.status(400).json({
          ok: false,
          msg: error
        })
    }
}

export const addAutomobile = async (req, res = response) => {
    try{
        const{ description, model, motorSerial, plaque, originalDate, serial, responsableName } = req.body
        const isTaken = await isAutomobileTaken(plaque, motorSerial, serial, false)
        if(isTaken){
            return res.status(400).json({
                ok: false,
                msg: 'Plaque, motorSerial, serial are used'
            })
        }
        const newAutomobile = new Automobiles({
            description,
            model,
            motorSerial,
            plaque,
            originalDate: new Date(originalDate).toISOString(),
            serial,
            responsableName,
            creationDate: new Date().toISOString()
        })
        await newAutomobile.save()

        return res.status(200).json({
            ok: true,
            msg: newAutomobile
        })

    } catch (error){
        res.status(400).json({
            ok: false,
            msg: error
        })
    }
}

export const editAutomobile = async (req, res = response) => {
    try{ 
        const { id } =req.params
        const { description, model, motorSerial, plaque, originalDate, serial, responsableName } = req.body

       const isTaken = await isAutomobileTaken(plaque, motorSerial, serial, true, id)
       if(isTaken){
            return res.status(400).json({
                ok: false,
                msg: 'Plaque, motorSerial, serial are used'
            })
        }

        const updateAutomobile = await Automobiles.findByIdAndUpdate( id )
        updateAutomobile.description = description
        updateAutomobile.model = model
        updateAutomobile.motorSerial = motorSerial
        updateAutomobile.plaque = plaque
        updateAutomobile.originalDate = new Date(originalDate).toISOString()
        updateAutomobile.serial = serial
        updateAutomobile.responsableName = responsableName
        updateAutomobile.updateDate = new Date().toISOString()

        await updateAutomobile.save()
        return res.status(200).json({
            ok: true,
            msg: updateAutomobile
        })

    }catch (error) {
        res.status(400).json({
          ok: false,
          msg: error
        })
    }
}

export const deleteAutomobile = async (req, res = response) => {
    try{
        const { id } = req.params
        const deleteAutomobile = await Automobiles.findByIdAndUpdate(id)
        if(deleteAutomobile == null){
            return res.status(400).json({
                ok:false,
                msg: "Automobile hasn't been found"
            })
        }
        deleteAutomobile.isDelete = true
        await deleteAutomobile.save()
        return res.status(200).json({
            ok: true,
            msg :'Automobile has been deleted'
        })
    } catch (error) {
        return res.status(400).json({
          ok: false,
          msg: error
        })
      }
}