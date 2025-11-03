import { DataTypes } from 'sequelize'
import sequelize from '../db/dbConnection'

const UserModel = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tenantId: {
      type: DataTypes.UUID,
      field: 'tenant_id',
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ['USER'],
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
)

export default UserModel