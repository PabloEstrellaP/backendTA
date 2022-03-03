import { Router } from 'express'
import { check } from 'express-validator'
import { getRoles, getRoleById, addRole, editRole, deleteRole } from '../controllers/roles.js'
import verifyFields from '../middlewares/verifyFields.js'

const verify = [
    check('name', 'name is required').not().isEmpty(),
    check('permissions', 'permissions is required').not().isEmpty(),
    verifyFields
]

const routerRole = Router()

routerRole.get('/', getRoles)
routerRole.get('/:id', getRoleById)
routerRole.post('/', verify,  addRole)
routerRole.put('/:id', verify, editRole)
routerRole.delete('/:id', deleteRole)

export default routerRole
