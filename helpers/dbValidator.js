import User from '../models/mongo/users.js'
import Automobile from '../models/mongo/automobiles.js'
import HousingSector from '../models/mongo/housingSector.js'
import IT from '../models/mongo/it.js'

export const isEmailTaken = async (email) => {
  const existeEmail = await User.findOne({ email })
  if (existeEmail) throw new Error('Email has already been taken')
}

export const isAutomobileTaken = async (plaque, motorSerial, serial, hasId = false, id) => {
  const options = {
    $or: [
      { plaque }, 
      { motorSerial },
      { serial }
    ]
  }
  if(hasId) options._id = { $ne: id }
  const existAutomobile = await Automobile.find(options)
  if( existAutomobile.length > 0 ) return true
  return false
}

export const isHousingSectorTaken = async(serial, hasId = false, id) => {
  const options = {
    serial
  }
  if(hasId) options._id = { $ne: id }
  const existHousingSelector = await HousingSector.find(options)
  if( existHousingSelector.length > 0 ) return true
  return false
}

export const isITTaken = async(serial, hasId = false, id) => {
  const options = {
    serial
  }
  if(hasId) options._id = { $ne: id }
  const existIT = await IT.find(options)
  if( existIT.length > 0 ) return true
  return false
}