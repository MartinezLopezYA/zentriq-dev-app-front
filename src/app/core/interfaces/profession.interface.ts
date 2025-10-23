import { ProfessionCategoryInProfessionInterface } from "./professioncategory.interface";

export interface UserProfessionInterface {
  professionuuid: string,
  professionname: string,
  professioncategory: ProfessionCategoryInProfessionInterface
}


export interface ProfessionInCategoryInterface {
  professionuuid: string,
  professionname: string
}

export interface GetProfessionsInterface {
  professionuuid: string,
  professionname: string,
  professioncode: string,
  professionabbreviation: string,
  professioncategory: ProfessionCategoryInProfessionInterface,
  isActive: boolean
}
