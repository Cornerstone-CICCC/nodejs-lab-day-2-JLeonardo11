import { v4 as uuidv4 } from 'uuid'
import { User } from '../types/user'
import bcrypt from 'bcrypt'

class UserModel {
  private users: User[] = []

  findAll(username: any) {
    return this.users
  }

  findById(id: string) {
    const user = this.users.find(u => u.id === id)
    if (!user) return null
    return user
  }

  async createUser(newUser: Omit<User, 'id'>) {
    const { username, password, firstname, lastname } = newUser
    const foundIndex = this.users.findIndex(u => u.username === username)
    if (foundIndex !== -1) return false
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = {
      id: uuidv4(),
      username,
      password: hashedPassword,
      firstname,
      lastname
    }
    this.users.push(user)
    return user
  }

  async editUserById(id: string, updates: Partial<User>) {
    const foundIndex = this.users.findIndex(u => u.id === id)
    if (foundIndex === -1) return false
    let hashedPassword = undefined
    if (updates.password) {
      hashedPassword = await bcrypt.hash(updates.password, 12)
    }
    const updatedUser: User = {
      ...this.users[foundIndex],
      username: updates.username ?? this.users[foundIndex].username,
      password: hashedPassword ? hashedPassword : this.users[foundIndex].password
    }
    this.users[foundIndex] = updatedUser
    return updatedUser
  }

  removeUserById(id: string) {
    const foundIndex = this.users.findIndex(u => u.id === id)
    if (foundIndex === -1) return false
    this.users.splice(foundIndex, 1)
    return true
  }

  async checkUserPass(username: string, password: string) {
    const user = this.users.find(u => u.username === username)
    if (!user) return false
    const isMatch: boolean = await bcrypt.compare(password, user.password)
    if (!isMatch) return false
    return user
  }
}

export default new UserModel()