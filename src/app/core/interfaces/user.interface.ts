import { GenderEnum } from "../enums/gender.enum"
import { UserIdentificationTypeInterface } from "./global/identificationtype.interface"
import { CityInUserInterface } from "./global/location.interface"
import { UserProfessionInterface } from "./profession.interface"
import { RoleInUsersInterface } from "./role.interface"

export interface UserLoginResponseInterface {
  useruuid: string,
  firstname: string,
  lastname: string,
  username: string,
  useremail: string,
  userphone: string,
  useridentificationnumber: number
}

export interface UserSessionResponseInterface {
  useruuid: string,
  firstname: string,
  lastname: string,
  username: string,
  useremail: string,
  userphone: string,
  useridentificationnumber: number
}

export interface UserProfileInterface {
  useruuid: string,
  firstname: string,
  lastname: string,
  username: string,
  useremail: string,
  userphone: string,
  isActive: boolean,
  useridentificationtype: {
    identificationtypeuuid: string,
    identificationtypename: string
  },
  useridentificationnumber: number,
  additionalInfo: {
    usergender: string,
    userprofession: {
      professionuuid: string,
      professionname: string,
      professioncategory: {}
    },
    city: {
      cityuuid: string,
      cityname: string,
      department: {
        departmentuuid: string,
        departmentname: string,
        country: {
          countryuuid: string,
          countryname: string
        }
      }
    },
    useraddress: string,
    dateOfBirth: string,
    createdAt: string,
    updatedAt: string,
    roles: [
      {
        roleuuid: string,
        rolename: string,
        rolecode: string,
        permissions: [
          {
            permissionuuid: string,
            permissionname: string,
            permissioncode: string
          }
        ]
      }
    ]
  }
}

export interface GetUserInterface {
  useruuid: string,
  firstname: string,
  lastname: string,
  username: string,
  useremail: string,
  userphone: string,
  roles?: RoleInUsersInterface[],
  userprofession: UserProfessionInterface,
  useridentificationtype: UserIdentificationTypeInterface,
  useridentificationnumber: number,
  isActive: boolean
}

export interface CreateUserInterface {
  firstname: string,
  lastname: string,
  username: string,
  useremail: string,
  userpassword: string,
  userphone?: string,
  identificationtypeuuid: string,
  useridentificationnumber: number,
  usergender: GenderEnum,
  professionuuid: string,
  cityuuid: string,
  useraddress: string,
  dateOfBirth: Date,
  isActive: boolean
}


export interface GetUserByUudInterface {
  useruuid: string,
  firstname: string,
  lastname: string,
  username: string,
  useremail: string,
  userphone: string,
  useridentificationtype: UserIdentificationTypeInterface,
  useridentificationnumber: number,
  additionalInfo: AdditionalInfo,
  isActive: boolean

}

export interface AdditionalInfo {
  usergender: string,
  userprofession: UserProfessionInterface,
  city: CityInUserInterface,
  useraddress: string,
  dateOfBirth: Date,
  createdAt: string,
  updatedAt: string,
  roles: {}
}

export interface UpdateUserInterface {
  firstname?: string,
  lastname?: string,
  username?: string,
  useremail?: string,
  userphone?: string,
  identificationtypeuuid?: string,
  useridentificationnumber?: number,
  usergender?: string,
  professionuuid?: string,
  cityuuid?: string,
  useraddress?: string,
  dateOfBirth?: Date
}


export interface UpdateUserStatusInterface {
  useruuid: string,
  message: string,
  statusCode: number
}
