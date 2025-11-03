import { Sequelize } from 'sequelize'
import { Pool } from 'pg'

// Admin connection pool for creating databases
const adminPool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: 'postgres', // Connect to default postgres database
  user: process.env.DB_ADMIN_USER || 'postgres',
  password: process.env.DB_ADMIN_PASSWORD,
})

// Create a new database for a tenant
export const createTenantDatabase = async (dbName: string): Promise<void> => {
  const client = await adminPool.connect()
  try {
    // Create the database
    await client.query(`CREATE DATABASE ${dbName}`)

    // Connect to the new database and initialize schema
    const tenantSequelize = new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: dbName,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
      logging: false,
    })

    // Sync schema (create tables for users, students, teachers, etc.)
    await tenantSequelize.sync()
    await tenantSequelize.close()
  } finally {
    client.release()
  }
}

// Get Sequelize connection for a specific tenant database
export const getTenantConnection = (dbName: string): Sequelize => {
  return new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: dbName,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    logging: false,
  })
}