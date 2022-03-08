import { response } from 'express'
import  bcryptjs from 'bcryptjs'

import UsersAuth from '../models/mongo/userAuth.js'

export const getUsersAuth = async (req, res = response) => {
  try {
    const usersAuth = await UsersAuth.find({ isDelete: false }).populate('rol').populate('personalData')
    return res.status(200).json({
      ok: true,
      msg: usersAuth,
    })

  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const getUserAuthById = async (req, res = response) => {
  try {
    
    const { id } = req.params
    const userAuth = await UsersAuth.findById(id).populate('rol').populate('personalData')
    if( userAuth.isDelete == true ){
      return res.status(400).json({
        ok: false,
        msg: "User Auth hasn't been found"
      })
    }
    return res.status(200).json({
      ok: true,
      msg: userAuth,
    })

  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const addUserAuth = async (req, res = response ) => {
  try {
    const { userName, password, rol, personalData } = req.body
  
    const newUsersAuth = new UsersAuth({
      userName, 
      password, 
      rol, 
      personalData, 
      creationDate: new Date().toISOString()
    })

    const salt = bcryptjs.genSaltSync()
    newUsersAuth.password = bcryptjs.hashSync( password, salt )

    await newUsersAuth.save()

    return res.status(200).json({
      ok: true,
      msg: newUsersAuth
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const editUsersAuth = async (req, res = response ) => {
  try {
    const { id } = req.params
    const { password, rol } = req.body

    const updateUserAuth = await UsersAuth.findByIdAndUpdate( id )
    
    const salt = bcryptjs.genSaltSync()
    
    updateUserAuth.password = bcryptjs.hashSync( password, salt ) 
    updateUserAuth.rol = rol 
    updateUserAuth.updateDate = new Date().toISOString() 

    await updateUserAuth.save()

    return res.status(200).json({
      ok: true,
      msg: updateUserAuth
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const deleteUserAuth = async (req, res = response ) => {
  try {
    const { id } = req.params
    const deleteUserAuth = await UsersAuth.findByIdAndUpdate( id )
    if( deleteUserAuth == null ){
      return res.status(400).json({
        ok: false,
        msg: "User hasn't been found"
      })
    }
    deleteUserAuth.isDelete = true

    await deleteUserAuth.save()
    return res.status(200).json({
      ok: true,
      msg: 'User has been deleted'
    })

  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}