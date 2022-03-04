import { Router } from 'express'
import { check } from 'express-validator'
import { getUsersAuth, getUserAuthById, addUserAuth, editUsersAuth, deleteUserAuth } from '../controllers/usersAuth.js'
import verifyFields from '../middlewares/verifyFields.js'
import verifyJWT from '../middlewares/verifyJWT.js'

const verify = [
    verifyJWT,
    check('userName', 'userName is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
    check('rol', 'rol is required').not().isEmpty(),
    check('personalData', 'personalData is require').not().isEmpty(),
    verifyFields
]

const routerUserAuth = Router()

routerUserAuth.get('/', verifyJWT, getUsersAuth)
routerUserAuth.get('/:id', verifyJWT, getUserAuthById)
routerUserAuth.post('/', verify,  addUserAuth)
routerUserAuth.put('/:id', [
    verifyJWT,
    check('password', 'password is required').not().isEmpty(),
    check('rol', 'rol is required').not().isEmpty(),
    verifyFields
], editUsersAuth)
routerUserAuth.delete('/:id', verifyJWT, deleteUserAuth)

export default routerUserAuth
