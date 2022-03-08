import { Router } from 'express'
import { check } from 'express-validator'
import { getDivision, getDivisionById, addDivision, editDivision, deleteDivision } from '../controllers/division.js'
import verifyFields from '../middlewares/verifyFields.js'
import verifyJWT from '../middlewares/verifyJWT.js'

const verify = [
    verifyJWT,
    check('name', 'name is required').not().isEmpty(),
    check('housingSector', 'housingSector is required').not().isEmpty(),
    check('IT', 'IT is required').not().isEmpty(),
    verifyFields
]

const divisionRouter = Router()

divisionRouter.get('/', verifyJWT, getDivision)
divisionRouter.get('/:id', verifyJWT, getDivisionById)
divisionRouter.post('/', verify,  addDivision)
divisionRouter.put('/:id', verify, editDivision)
divisionRouter.delete('/:id', verifyJWT, deleteDivision)

export default divisionRouter
