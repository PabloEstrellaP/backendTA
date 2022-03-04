import { Router } from 'express'
import { check } from 'express-validator'
import { getUsers, getUserById, addUser, editUser, deleteUser } from '../controllers/users.js'
import verifyFields from '../middlewares/verifyFields.js'
import verifyJWT from '../middlewares/verifyJWT.js'

const verify = [
    check('name', 'name is required').not().isEmpty(),
    check('lastName', 'lastName is required').not().isEmpty(),
    check('phone', 'phone is required').not().isEmpty().isLength({ min: 10 }),
    check('email', 'Email must be email').isEmail(),
    verifyFields
]

const routerUser = Router()

routerUser.get('/', verifyJWT, getUsers)
routerUser.get('/:id', verifyJWT, getUserById)
routerUser.post('/', verify,  addUser)
routerUser.put('/:id', verify, editUser)
routerUser.delete('/:id', verifyJWT, deleteUser)

export default routerUser
