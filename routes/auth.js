import { Router } from 'express'
import { check } from 'express-validator'
import { login, renovateToken } from '../controllers/auth.js'
import verifyFields from '../middlewares/verifyFields.js'

const verify = [
    check('userName', 'userName is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
    verifyFields
]

const userAuthRouter = Router()


userAuthRouter.post('/', verify, login)
userAuthRouter.post('/renovate', [
    check('user', 'user is required').not().isEmpty(),
    check('token', 'token is required').not().isEmpty(),
    verifyFields
], renovateToken)

export default userAuthRouter
