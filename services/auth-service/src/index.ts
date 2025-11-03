import 'dotenv/config'
import express from 'express'
import tenantRoutes from './routers/tenantRoutes'
import authRouter from './routers/authRouter'
import sequelize from './db/dbConnection'
import { seedSuperAdmin } from './db/createSuperAdmin'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use('/api', authRouter)
app.use('/api', tenantRoutes)

sequelize
  .sync({ force: false })
  .then(async () => {
    console.log('✅ Database synchronized')

    // Seed super admin
    await seedSuperAdmin()

    app.listen(PORT, () => {
      console.log(`🚀 Auth service running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('❌ Unable to sync database:', error)
  })
