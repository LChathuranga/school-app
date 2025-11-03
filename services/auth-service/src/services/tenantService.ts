import Tenant from '../types/Tenant'
import TenantModel from '../models/TenantModel'
import sequelize from '../db/dbConnection'
import { createTenantDatabase } from './tenantDbService'

export const createTenant = async (
  tenant: Omit<Tenant, 'id' | 'databaseName'>
): Promise<Tenant> => {
  const transaction = await sequelize.transaction()

  try {
    const newTenant = await TenantModel.create(
      {
        name: tenant.name,
        ownerEmail: tenant.ownerEmail,
      },
      { transaction }
    )

    const dbName = `tenant_${newTenant.dataValues.id.replace(/-/g, '_')}`
    await createTenantDatabase(dbName)

    await newTenant.update({ databaseName: dbName }, { transaction })

    await transaction.commit()

    return newTenant.dataValues as Tenant
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
