import { DataTypes } from 'sequelize'
import sequelize from '../db/dbConnection'

const TenantModel = sequelize.define(
  'Tenant',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'owner_email',
    },
    databaseName: {
      type: DataTypes.STRING,
      field: 'database_name',
    },
  },
  {
    tableName: 'tenants',
    timestamps: true,
    underscored: true,
  }
)

export default TenantModel