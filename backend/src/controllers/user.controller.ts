import { Request, RequestHandler, Response } from 'express'
import userModel from '../models/user.model'
import { User } from '../types/user'

/**
 * Get all users
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Returns list of users.
 */
const getUsers = (req: Request, res: Response) => {
  const users = userModel.findAll(null)
  res.status(200).json(users)
}

/**
 * Get user by ID
 * 
 * @param {Request<{ id: string}>} req
 * @param {Response} res
 * @returns {void} Returns one user.
 */
const getUserById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const user = userModel.findById(id)
  if (!user) {
    res.status(404).send('User not found!')
    return
  }
  res.status(200).json(user)
}

/**
 * Add new user
 * 
 * @param {Request<{ id: string}>} req
 * @param {Response} res
 * @returns {void} Returns newly created user.
 */
const addUser: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, password, firstname, lastname } = req.body;
      
      if (!username || !password || !firstname || !lastname) {
        return res.status(400).json({ message: "All fields are required!" });
      }
  
      const userExists = await userModel.findAll(username);
      if (userExists) {
        return res.status(400).json({ message: "Username already taken!" });
      }
  
      const newUser = await userModel.createUser({ username, password, firstname, lastname });
  
      return res.status(201).json({ message: "User registered successfully!", user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error!" });
    }
  };

/**
 * Edit user by ID
 * 
 * @param {Request<{ id: string }, {}, Partial<User>>} req
 * @param {Response} res
 * @returns {void} Returns updated user.
 */
const updateUserById = async (req: Request<{ id: string }, {}, Partial<User>>, res: Response) => {
  const { id } = req.params
  const { username, password} = req.body
  const user = await userModel.editUserById(id, { username, password })
  if (!user) {
    res.status(404).json({ error: "User does not exist!" })
    return
  }
  res.status(200).json(user)
}

/**
 * Delete user by ID
 * 
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void} Returns success or fail message.
 */
const deleteUserById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const result: boolean = userModel.removeUserById(id)
  if (!result) {
    res.status(404).json({ message: "User not found!" })
    return
  }
  res.status(200).json({ message: "Deleted user!" })
}

/**
 * Login user
 * 
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns {void} Returns cookie and redirect.
 */
const loginUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(500).send("Username/password is missing!")
    return
  }
  const user = await userModel.checkUserPass(username, password)
  if (!user) {
    res.status(500).send("Login details are incorrect!")
    return
  }
  if (req.session) {
    req.session.isLoggedIn = true
    req.session.username = user.username
  }
  res.status(200).send("Successfully logged in!")
  
}

export default {
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById,
  loginUser
}