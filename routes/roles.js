import { Router } from 'express'
import { check } from 'express-validator'
import { getRoles, getRoleById, addRole, editRole, deleteRole } from '../controllers/roles.js'
import verifyFields from '../middlewares/verifyFields.js'
import verifyJWT from '../middlewares/verifyJWT.js'

const verify = [
    verifyJWT,
    check('name', 'name is required').not().isEmpty(),
    check('permissions', 'permissions is required').not().isEmpty(),
    verifyFields
]

const roleRouter = Router()

roleRouter.get('/', verifyJWT, getRoles)
roleRouter.get('/:id', verifyJWT, getRoleById)
roleRouter.post('/', verify,  addRole)
roleRouter.put('/:id', verify, editRole)
roleRouter.delete('/:id', verifyJWT, deleteRole)

export default roleRouter
