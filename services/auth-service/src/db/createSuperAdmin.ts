import UserModel from '../models/UserModel'
import { hashPassword } from '../utils/password'

export const seedSuperAdmin = async () => {
  try {
    const existingSuperAdmin = await UserModel.findOne({
      where: { email: 'admin@platform.com' },
    })

    if (!existingSuperAdmin) {
      const hashedPassword = await hashPassword('admin123')

      await UserModel.create({
        email: 'admin@platform.com',
        name: 'Platform Admin',
        password: hashedPassword,
        roles: ['SUPER_ADMIN'],
      })

      console.log('✅ Super admin created: admin@platform.com / admin123')
    } else {
      console.log('ℹ️  Super admin already exists')
    }
  } catch (error) {
    console.error('Error seeding super admin:', error)
  }
}
// Password: 'admin123' (hashed with bcrypt)
