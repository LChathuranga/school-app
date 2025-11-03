import { Request, Response } from 'express'
import * as tenantService from '../services/tenantService'

export const createTenant = async (req: Request, res: Response) => {
  try {
    const { name, ownerEmail } = req.body

    if (!name || !ownerEmail) {
      return res.status(400).json({ 
        error: 'Name and owner email are required' 
      })
    }

    const tenant = await tenantService.createTenant({ name, ownerEmail })

    res.status(201).json({
      message: 'Tenant created successfully',
      tenant,
    })
  } catch (error: any) {
    console.error('Error creating tenant:', error)
    res.status(500).json({ 
      error: error.message || 'Failed to create tenant' 
    })
  }
}