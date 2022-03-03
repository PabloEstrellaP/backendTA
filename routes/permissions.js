import { Router } from 'express'
import { check } from 'express-validator'
import { getPermissions, getPermissionById, addPermission, editPermission, deletePermission } from '../controllers/permission.js'
import verifyFields from '../middlewares/verifyFields.js'

const verify = [
    check('name', 'name is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
    verifyFields
]

const routerPermissions = Router()

routerPermissions.get('/', getPermissions)
routerPermissions.get('/:id', getPermissionById)
routerPermissions.post('/', verify,  addPermission)
routerPermissions.put('/:id', verify, editPermission)
routerPermissions.delete('/:id', deletePermission)

export default routerPermissions
