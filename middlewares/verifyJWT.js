import jwt from 'jsonwebtoken'

const validarJWT = (req, res, next) => {
  const token = req.header('token')
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Token hasn't been found"
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_KEY)
    req.id = id

    next()
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token invalid'
    })
  }
}

export default validarJWT
