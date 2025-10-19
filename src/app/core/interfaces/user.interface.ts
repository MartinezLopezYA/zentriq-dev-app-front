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
