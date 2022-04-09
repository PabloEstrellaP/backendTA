import { response } from 'express'
import Users from '../models/mongo/users.js'

export const getUsers = async (req, res = response) => {
  try {
    const users = await Users.find({ isDelete: false })
    return res.status(200).json({
      ok: true,
      msg: users,
    })

  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const getUserById = async (req, res = response) => {
  try {
    
    const { id } = req.params
    const user = await Users.findById(id)
    if( user.isDelete == true ){
      return res.status(400).json({
        ok: false,
        msg: "User hasn't been found"
      })
    }
    return res.status(200).json({
      ok: true,
      msg: user,
    })

  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const addUser = async (req, res = response ) => {
  try {
    const { name, lastName, phone, email, address } = req.body
    const emailIsUsed = await Users.find({ email })
    if ( emailIsUsed.length > 0 ){
      return res.status(400).json({
        ok: false,
        msg: 'Email is used'
      })
    }
    const newUser = new Users({
      name, 
      lastName, 
      phone, 
      email, 
      address, 
      creationDate: new Date().toISOString()
    })

    await newUser.save()

    return res.status(200).json({
      ok: true,
      msg: newUser
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const editUser = async (req, res = response ) => {
  try {
    const { id } = req.params
    const { name, lastName, phone, email, address } = req.body

    const emailIsUsed = await Users.find({ email, _id: { $ne: id } })
    if ( emailIsUsed.length > 0 ){
      return res.status(400).json({
        ok: false,
        msg: 'Email is used'
      })
    }

    const updateUser = await Users.findByIdAndUpdate( id )

    updateUser.name = name 
    updateUser.lastName = lastName 
    updateUser.phone = phone 
    updateUser.email = email 
    updateUser.address = address 
    updateUser.updateDate = new Date().toISOString() 

    await updateUser.save()

    return res.status(200).json({
      ok: true,
      msg: updateUser
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: error
    })
  }
}

export const deleteUser = async (req, res = response ) => {
  try {
    const { id } = req.params
    const deleteUser = await Users.findByIdAndUpdate( id )
    if( deleteUser == null ){
      return res.status(400).json({
        ok: false,
        msg: "User hasn't been found"
      })
    }
    deleteUser.isDelete = true

    await deleteUser.save()
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