import { response } from 'express'
import IT from '../models/mongo/IT.js'
import { isITTaken } from '../helpers/dbValidator.js'

export const getIT = async (req, res = response) => {
    try{
        const it = await IT.find({ isDelete: false })
        return res.status(200).json({
            ok: true,
            msg: it
        })
    }catch(error){
        return res.status(400).json({
            ok: false,
            msg: error
        })
    }}


export const getITById = async (req, res = response) => {
    try{
        const { id } = req.params
        const it = await IT.findById(id)
        if(it.isDelete == true){
            return res.status(400).json({
                ok: false,
                msg: "IT hasn't been found"
            })
        }
        return res.status(200).json({
            ok: true,
            msg: it
        })

    }catch (error) {
        return res.status(400).json({
          ok: false,
          msg: error
        })

}}

export const addIT =async(req, res = response) => {
    try{
        const{ model, cost, description, serial, responsableName } = req.body
        const isTaken = await isITTaken(serial, false)
        if(isTaken){
            return res.status(400).json({
                ok: false,
                msg: 'Serial is used'
            })
        }
        const newIT = new IT({
            model,
            cost,
            description,
            serial,
            responsableName,
            creationDate:new Date().toISOString()
        });
        await newIT.save()
        return res.status(200).json({
            ok: true,
            msg: newIT
          })
    }catch (error){
        res.status(400).json({
            ok: false,
            msg: error
        })
    }

}
export const editIT = async (req, res = response) => {
    try{
        const { id } = req.params
        const{ model, cost, description, serial, responsableName } = req.body
        const isTaken = await isITTaken(serial, true, id)
        if(isTaken){
            return res.status(400).json({
                ok: false,
                msg: 'Serial is used'
            })
        }
        const updateIT = await IT.findByIdAndUpdate(id)
        updateIT.model = model
        updateIT.cost = cost
        updateIT.description = description
        updateIT.serial = serial
        updateIT.responsableName = responsableName
        updateIT.updateDate = new Date().toISOString()

        await updateIT.save()
        return res.status(200).json({
            ok: true,
            msg: updateIT
        })
    }catch (error) {
        res.status(400).json({
          ok: false,
          msg: error
        })
      }
    
}
export const deleteIT = async (req, res = response) => {
    try{
        const{ id } = req.params
        const deleteIT= await IT.findByIdAndUpdate(id)
        if(deleteIT == null){
            return res.status(400).json({
                ok:false,
                msg: "IT hasn't been found"})
        }
        deleteIT.isDelete = true
        await deleteIT.save()
        return res.status(200).json({
            ok: true,
            msg :'IT has been deleted'
        })

    } catch (error) {
        return res.status(400).json({
        ok: false,
        msg: error
    })
  }
}