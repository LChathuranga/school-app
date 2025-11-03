import jwt from 'jsonwebtoken'
import User from '../types/User'

const JWT_SECRET = process.env.JWT_SECRET!

export const signJwt = (user: User): string => {
  return jwt.sign(
    {
      sub: user.id,
      tenant: user.tenantId,
      roles: user.roles,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  )
}

export const verifyJwt = (token: string): Partial<User> | null => {
    const decoded = jwt.verify(token, JWT_SECRET)
    return typeof decoded === 'object' ? decoded as Partial<User> : null
}
