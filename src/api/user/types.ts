export enum UserRoles {
  Admin = 'Admin',
  Employee = 'Employee',
}

export interface User {
  email: string
  id: string
  name: string
  role: {
    id: number
    name: UserRoles
    outletId: number
  }
}
