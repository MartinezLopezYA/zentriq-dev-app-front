export class CredentialsInterface {
  useremail: string | null = null;
  userpassword: string | null = null;
}

export class AuthResponseInterface {
  access_token: string | null = null;
  user: any;
}
