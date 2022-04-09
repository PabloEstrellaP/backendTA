import { Router } from 'express'
import { check } from 'express-validator'
import { getUsersAuth, getUserAuthById, addUserAuth, editUsersAuth, deleteUserAuth } from '../controllers/usersAuth.js'
import verifyFields from '../middlewares/verifyFields.js'
import verifyJWT from '../middlewares/verifyJWT.js'

const verify = [
    // verifyJWT,
    check('userName', 'userName is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
    check('rol', 'rol is required').not().isEmpty(),
    check('personalData', 'personalData is require').not().isEmpty(),
    verifyFields
]

const userAuthRouter = Router()

userAuthRouter.get('/', verifyJWT, getUsersAuth)
userAuthRouter.get('/:id', verifyJWT, getUserAuthById)
userAuthRouter.post('/', verify,  addUserAuth)
userAuthRouter.put('/:id', [
    verifyJWT,
    check('rol', 'rol is required').not().isEmpty(),
    verifyFields
], editUsersAuth)
userAuthRouter.delete('/:id', verifyJWT, deleteUserAuth)

export default userAuthRouter
