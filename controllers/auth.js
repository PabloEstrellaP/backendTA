import { response } from 'express'
import bcryptjs from 'bcryptjs'

import UsersAuth from '../models/mongo/userAuth.js'
import { generarJWT, comprobarJWT } from '../helpers/JWT.js'

export const login = async(req, res = response) => {

  const { userName, password } = req.body

  try {
      const user = await UsersAuth.findOne({ userName }).populate('rol').populate('personalData')
      if ( !user ) {
          return res.status(400).json({
            ok: false,
            msg: "Credentials aren't corrects"
          })
      }

      if ( user.isDelete ) {
          return res.status(400).json({
            ok: false,
            msg: "User hasn't been found"
          })
      }

      const validPassword = bcryptjs.compareSync( password, user.password )
      if ( !validPassword ) {
          return res.status(400).json({
              msg: "Credentials aren't corrects"
          })
      }
      const id = user._id.toString()
      const token = await generarJWT( id )
      console.log(token)

      return res.status(200).json({
        ok: true,
        user,
        token
      })

  } catch (error) {
      return res.status(400).json({
        ok: false,
        msg: error
      })
  }   
}


export const renovateToken = async(req, res = response) =>{

  const { token } = req.body

  const isRenovated = comprobarJWT(token)

  if ( !isRenovated[0] ){
    return res.status(400).json({
      ok: false,
      msg: 'Token is expired'
    })
  }

  const user = await UsersAuth.findById(isRenovated[1]).populate('rol').populate('personalData')
  const generateToken = await generarJWT( user.id )
  return res.status(200).json({
      ok: true,
      user,
      token: generateToken
  })
}