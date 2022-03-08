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

const userRouter = Router()

userRouter.get('/', verifyJWT, getUsers)
userRouter.get('/:id', verifyJWT, getUserById)
userRouter.post('/', verify,  addUser)
userRouter.put('/:id', verify, editUser)
userRouter.delete('/:id', verifyJWT, deleteUser)

export default userRouter
