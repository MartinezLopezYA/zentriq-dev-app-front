import { GetPermissionssInterface } from "./permission.interface"

export interface RoleInUsersInterface {
  roleuuid: string,
  rolename: string,
  rolecode: string
}

export interface GetRolesInterface {
  roleuuid: string,
  rolename: string,
  roledesc: string,
  rolecode: string,
  isActive: boolean
}

export interface CreateRoleInterface {
  rolename: string,
  roledesc: string,
  rolecode: string
}

export interface GetRolesWithPermissionsInterface {
  roleuuid: string,
  rolename: string,
  roledesc: string,
  rolecode: string,
  isActive: boolean,
  permissions: GetPermissionssInterface[]
}

export interface UpdateRoleStatusInterface {
  roleuuid: string,
  message: string,
  statusCode: number
}
