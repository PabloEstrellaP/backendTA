import { response } from 'express'
import Roles from '../models/mongo/roles.js'

export const getRoles = async (req, res = response) => {
  try {
    const roles = await Roles.find({ })
    return res.status(200).json({
      ok: true,
      msg: roles
    })

  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const getRoleById = async (req, res = response) => {
  try {
    
    const { id } = req.params
    const role = await Roles.findById(id)
    return res.status(200).json({
      ok: true,
      msg: role
    })

  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const addRole = async (req, res = response ) => {
  try {
    const { name, permissions } = req.body;

    const newRole = new Roles({
      name, 
      permissions,
      creationDate: new Date().toISOString()
    });

    await newRole.save()

    return res.status(200).json({
      ok: true,
      msg: newRole
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const editRole = async (req, res = response ) => {
  try {
    const { id } = req.params
    const { name, permissions } = req.body

    const updateRole = await Roles.findByIdAndUpdate( id )

    updateRole.name = name 
    updateRole.permissions = permissions 
    updateRole.updateDate = new Date().toISOString() 

    await updateRole.save()

    return res.status(200).json({
      ok: true,
      msg: updateRole
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const deleteRole = async (req, res = response ) => {
  try {
    const { id } = req.params
    await Roles.findByIdAndRemove( id )

    return res.status(200).json({
      ok: true,
      msg: 'Role has been deleted'
    })

  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}