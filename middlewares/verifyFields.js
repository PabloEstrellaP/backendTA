import { validationResult } from 'express-validator'

const verifyFields = (req, res, next) => {
  const errores = validationResult(req)

  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errores.mapped()
    })
  }

  next()
}

export default verifyFields
