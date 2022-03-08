import { Router } from 'express'
import { check } from 'express-validator'
import { getHousingSector, getHousingSectorById, addHousingSector, editHousingSector, deleteHousingSector } from '../controllers/housingSector.js'
import verifyFields from '../middlewares/verifyFields.js'
import verifyJWT from '../middlewares/verifyJWT.js'

const verify = [
    verifyJWT,
    check('serial', 'serial is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
    check('originalDate', 'originalDate is required').not().isEmpty(),
    check('cost', 'cost is required').not().isEmpty(),
    check('responsableName', 'responsableName is required').not().isEmpty(),
    verifyFields
]

const housingSectorRouter = Router()

housingSectorRouter.get('/', verifyJWT, getHousingSector)
housingSectorRouter.get('/:id', verifyJWT, getHousingSectorById)
housingSectorRouter.post('/', verify,  addHousingSector)
housingSectorRouter.put('/:id', verify, editHousingSector)
housingSectorRouter.delete('/:id', verifyJWT, deleteHousingSector)

export default housingSectorRouter
