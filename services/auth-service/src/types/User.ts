export default interface User {
  id: string
  name: string
  email: string
  tenantId: string
  roles: string[]
  password?: string
}
