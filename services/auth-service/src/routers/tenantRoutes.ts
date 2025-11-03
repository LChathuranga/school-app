import { Router } from 'express'
import { authenticate, requireSuperAdmin } from '../middlewares/authMiddleware'
import { createTenant } from '../controllers/tenantController'

const router = Router()

router.post('/tenants', authenticate, requireSuperAdmin, createTenant)

export default router
