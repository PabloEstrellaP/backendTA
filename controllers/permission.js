import { response } from 'express'
import Permissions from '../models/mongo/permission.js'

export const getPermissions = async (req, res = response) => {
  try {
    const permissions = await Permissions.find({ })
    return res.status(200).json({
      ok: true,
      msg: permissions
    })

  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const getPermissionById = async (req, res = response) => {
  try {
    
    const { id } = req.params
    const permission = await Permissions.findById(id)
    return res.status(200).json({
      ok: true,
      msg: permission
    })

  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const addPermission = async (req, res = response ) => {
  try {
    const { name, description } = req.body;

    const newPermission = new Permissions({
      name, 
      description,
      creationDate: new Date().toISOString()
    });

    await newPermission.save()

    return res.status(200).json({
      ok: true,
      msg: newPermission
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const editPermission = async (req, res = response ) => {
  try {
    const { id } = req.params
    const { name, description } = req.body

    const updatePermission = await Permissions.findByIdAndUpdate( id )

    updatePermission.name = name 
    updatePermission.description = description 
    updatePermission.updateDate = new Date().toISOString() 

    await updatePermission.save()

    return res.status(200).json({
      ok: true,
      msg: updatePermission
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const deletePermission = async (req, res = response ) => {
  try {
    const { id } = req.params
    await Permissions.findByIdAndRemove( id )

    return res.status(200).json({
      ok: true,
      msg: 'Permission has been deleted'
    })

  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error,
      lala: 'ok'
    })
  }
}