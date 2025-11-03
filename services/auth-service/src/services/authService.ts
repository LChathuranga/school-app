import UserModel from '../models/UserModel'
import User from '../types/User'
import { signJwt } from '../utils/jwt'
import { comparePassword, hashPassword } from '../utils/password'

export const register = async (data: {
  email: string
  name: string
  password: string
  tenantId?: string
  roles?: string[]
}): Promise<{ user: User; token: string }> => {
  const existingUser = await UserModel.findOne({ where: { email: data.email } })
  if (existingUser) {
    throw new Error('User already exists')
  }

  const hashedPassword = await hashPassword(data.password)

  const user = await UserModel.create({
    email: data.email,
    name: data.name,
    password: hashedPassword,
    tenantId: data.tenantId,
    roles: data.roles || ['USER'],
  })

  const userData: User = {
    id: user.dataValues.id,
    email: user.dataValues.email,
    name: user.dataValues.name,
    tenantId: user.dataValues.tenantId,
    roles: user.dataValues.roles,
  }

  const token = signJwt(userData)

  return { user: userData, token }
}

export const login = async (data: {
  email: string
  password: string
}): Promise<{ user: User; token: string }> => {
  const user = await UserModel.findOne({ where: { email: data.email } })
  if (!user){
    throw new Error('Invalid email or password')
  }

  const isValidPassword = await comparePassword(data.password, user.dataValues.password)
  if (!isValidPassword) {
    throw new Error('Invalid email or password')
  }

  const userData: User = {
    id: user.dataValues.id,
    email: user.dataValues.email,
    name: user.dataValues.name,
    tenantId: user.dataValues.tenantId,
    roles: user.dataValues.roles,
  }

  const token = signJwt(userData)

  return { user: userData, token }
}
