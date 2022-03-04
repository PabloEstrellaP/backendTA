import { Router } from 'express'
import { check } from 'express-validator'
import { getUsersAuth, getUserAuthById, addUserAuth, editUsersAuth, deleteUserAuth } from '../controllers/usersAuth.js'
import verifyFields from '../middlewares/verifyFields.js'

const verify = [
    check('userName', 'userName is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
    check('rol', 'rol is required').not().isEmpty(),
    check('personalData', 'personalData is require').not().isEmpty(),
    verifyFields
]

const routerUserAuth = Router()

routerUserAuth.get('/', getUsersAuth)
routerUserAuth.get('/:id', getUserAuthById)
routerUserAuth.post('/', verify,  addUserAuth)
routerUserAuth.put('/:id', [
    check('password', 'password is required').not().isEmpty(),
    check('rol', 'rol is required').not().isEmpty(),
    verifyFields
], editUsersAuth)
routerUserAuth.delete('/:id', deleteUserAuth)

export default routerUserAuth
