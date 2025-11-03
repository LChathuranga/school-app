import { Request, Response } from 'express'
import * as authService from '../services/authService'

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body

    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ message: 'Email, name and password are required' })
    }

    const result = await authService.register({ email, name, password })
    res.json({
      message: 'Login successful',
      user: result.user,
      token: result.token,
    })
  } catch (error: any) {
    console.log('----------------', error)

    res.status(400).json({ message: error.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    const result = await authService.login({ email, password })
    res.json({
      message: 'Login successful',
      user: result.user,
      token: result.token,
    })
  } catch (error: any) {
    res.status(401).json({ error: error.message })
  }
}
