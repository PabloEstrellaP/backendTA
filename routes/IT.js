import { Router } from 'express'
import { check } from 'express-validator'
import { getIT, getITById, addIT, editIT, deleteIT } from '../controllers/IT'
import verifyFields from '../middlewares/verifyFields'
import verifyJWT from '../middlewares/verifyJWT'

const verify = [
  verifyJWT,
  check('model', 'model is required').not().isEmpty(),
  check('cost', 'cost is required').not().isEmpty(),
  check('description', 'description is required').not().isEmpty(),
  check('serial', 'serial is required').not().isEmpty(),
  check('responsableName', 'responsableName is required').not().isEmpty(),
  verifyFields
]

const ITRouter = Router()

ITRouter.get('/', verifyJWT, getIT)
ITRouter.get('/:id', verifyJWT, getITById)
ITRouter.post('/', verify, addIT)
ITRouter.put('/:id', verify, editIT)
ITRouter.delete('/:id', verifyJWT, deleteIT)

export default ITRouter
