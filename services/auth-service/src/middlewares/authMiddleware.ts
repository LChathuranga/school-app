import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt'
import User from '../types/User'

declare global {
  namespace Express {
    interface Request {
      user?: Partial<User>
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const user = verifyJwt(token)

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    req.user = user
    next()
  } catch (error: any) {
    return res.status(401).json({ error: error.message || 'Invalid token' })
  }
}

export const requireSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.roles?.includes('SUPER_ADMIN')) {
    return res.status(403).json({ error: 'Super admin access required' })
  }
  next()
}
