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
