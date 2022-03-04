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

const routerRole = Router()

routerRole.get('/', verifyJWT, getRoles)
routerRole.get('/:id', verifyJWT, getRoleById)
routerRole.post('/', verify,  addRole)
routerRole.put('/:id', verify, editRole)
routerRole.delete('/:id', verifyJWT, deleteRole)

export default routerRole
