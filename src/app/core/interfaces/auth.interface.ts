import { UserLoginResponseInterface, UserSessionResponseInterface } from "./user.interface";

export class CredentialsInterface {
  useremail: string | null = null;
  userpassword: string | null = null;
}

export class AuthResponseInterface {
  access_token: string | null = null;
  refresh_token: string | null = null;
  user: UserLoginResponseInterface | null = null;
}


export interface UserSessionInterface {
  sessionActive: boolean,
  refreshToken: boolean,
  user: UserSessionResponseInterface
}
