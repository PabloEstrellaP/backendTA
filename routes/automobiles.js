import { Router } from 'express'
import { check } from 'express-validator'
import { getAutomobiles, getAutomobileById, addAutomobile, editAutomobile, deleteAutomobile } from '../controllers/automobiles.js'
import verifyFields from '../middlewares/verifyFields.js'
import verifyJWT from '../middlewares/verifyJWT.js'

const verify = [
    verifyJWT,
    check('description', 'description is required').not().isEmpty(),
    check('model', 'model is required').not().isEmpty(),
    check('motorSerial', 'motorSerial is required').not().isEmpty(),
    check('plaque', 'plaque is required').not().isEmpty(),
    check('originalDate', 'originalDate is required').not().isEmpty(),
    check('serial', 'serial is required').not().isEmpty(),
    check('responsableName', 'responsableName is required').not().isEmpty(),
    verifyFields
]

const automobileRouter = Router()

automobileRouter.get('/', verifyJWT, getAutomobiles)
automobileRouter.get('/:id', verifyJWT, getAutomobileById)
automobileRouter.post('/', verify,  addAutomobile)
automobileRouter.put('/:id', verify, editAutomobile)
automobileRouter.delete('/:id', verifyJWT, deleteAutomobile)

export default automobileRouter
