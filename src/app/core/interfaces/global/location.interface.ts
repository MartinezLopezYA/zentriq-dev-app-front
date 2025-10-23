export interface CountryInDeptoInterface {
  countryuuid: string,
  countryname: string
}

export interface DepartmentInCityInterface {
  departmentuuid: string,
  departmentname: string,
  country: CountryInDeptoInterface
}

export interface CityInUserInterface {
  cityuuid: string,
  cityname: string,
  department: DepartmentInCityInterface
}

export interface CountryInterface {
  countryuuid: string,
  countryname: string,
  countryisocode: string,
  countrynumericcode: string,
  isActive: boolean,
}

export interface DepartmentInterface {
  departmentuuid: string,
  departmentname: string,
  departmentcode: string,
  isActive: boolean,
}

export interface CityInterface {
  cityuuid: string,
  cityname: string,
  citycode: string,
  isActive: boolean,
}
