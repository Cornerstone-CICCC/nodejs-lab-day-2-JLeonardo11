import { Router } from 'express'
import userController from '../controllers/user.controller'

const userRouter = Router()

userRouter.post('/', userController.getUsers)
userRouter.get('/', userController.getUsers) // GET /users
userRouter.get('/:id', userController.getUserById) // GET /users/:id
userRouter.post('/login', userController.loginUser) // POST /users/login
userRouter.post('/signup', userController.addUser) // POST /users


export default userRouter