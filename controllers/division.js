import { response } from 'express'
import Division from '../models/mongo/division.js'

export const getDivision = async (req, res = response) => {
  try {
    const divisions = await Division.find({ isDelete: false }).populate('housingSector').populate('IT').populate('automobile')
    return res.status(200).json({
      ok: true,
      msg: divisions
    })

  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const getDivisionById = async (req, res = response) => {
  try {
    
    const { id } = req.params
    const division = await Division.findById(id).populate('housingSector').populate('IT')
    if(division.isDelete){
      return res.status(400).json({
        ok: false,
        msg: "Division hasn't been found"
      })
    }
    return res.status(200).json({
      ok: true,
      msg: division
    })

  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const addDivision = async (req, res = response ) => {
  try {
    const { name, housingSector, IT, automobile } = req.body
    const addData = {
      name, 
      housingSector,
      IT,
      creationDate: new Date().toISOString()
    }
    if(automobile){
      addData.automobile = automobile
    }
    const newDivision = new Division(addData)

    await newDivision.save()

    return res.status(200).json({
      ok: true,
      msg: newDivision
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const editDivision = async (req, res = response ) => {
  try {
    const { id } = req.params
    const { name, housingSector, IT, automobile } = req.body

    const updateDivision = await Division.findByIdAndUpdate( id )

    updateDivision.name = name 
    updateDivision.housingSector = housingSector
    updateDivision.IT = IT
    updateDivision.updateDate = new Date().toISOString() 
    if(automobile){
      updateDivision.automobile = automobile
    }

    await updateDivision.save()

    return res.status(200).json({
      ok: true,
      msg: updateDivision
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const deleteDivision = async (req, res = response ) => {
  try {
    const{ id } = req.params
    const deleteDivision= await Division.findByIdAndUpdate(id)
    if(deleteDivision == null){
        return res.status(400).json({
          ok: false,
          msg: "Division hasn't been found"
        })
    }
    deleteDivision.isDelete = true
    await deleteDivision.save()
    return res.status(200).json({
        ok: true,
        msg :'Division has been deleted'
    })

  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}