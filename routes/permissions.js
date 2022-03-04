import { Router } from 'express'
import { check } from 'express-validator'
import { getPermissions, getPermissionById, addPermission, editPermission, deletePermission } from '../controllers/permission.js'
import verifyFields from '../middlewares/verifyFields.js'
import verifyJWT from '../middlewares/verifyJWT.js'

const verify = [
    verifyJWT,
    check('name', 'name is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
    verifyFields
]

const routerPermissions = Router()

routerPermissions.get('/', verifyJWT, getPermissions)
routerPermissions.get('/:id', verifyJWT, getPermissionById)
routerPermissions.post('/', verify,  addPermission)
routerPermissions.put('/:id', verify, editPermission)
routerPermissions.delete('/:id', verifyJWT, deletePermission)

export default routerPermissions
