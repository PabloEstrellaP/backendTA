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

const permissionsRouter = Router()

permissionsRouter.get('/', verifyJWT, getPermissions)
permissionsRouter.get('/:id', verifyJWT, getPermissionById)
permissionsRouter.post('/', verify,  addPermission)
permissionsRouter.put('/:id', verify, editPermission)
permissionsRouter.delete('/:id', verifyJWT, deletePermission)

export default permissionsRouter
