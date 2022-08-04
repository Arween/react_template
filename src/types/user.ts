export interface IUserAuth {
  username: string;
  password: string;
  email: string;
}

export interface IUserConfirm {
  token: string;
  uid: string;
}
