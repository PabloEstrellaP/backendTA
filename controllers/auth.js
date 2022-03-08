import { response } from 'express'
import  bcryptjs from 'bcryptjs'

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

      const token = await generarJWT( user._id )

      return res.status(200).json({
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

  const { user, token } = req.body

  const isRenovated = comprobarJWT(token)

  if ( !isRenovated[0] ){
    return res.status(400).json({
      ok: false,
      msg: 'Token is expired'
    })
  }

  const generateToken = await generarJWT( user.id )

  return res.status(200).json({
      user,
      token: generateToken
  })
}