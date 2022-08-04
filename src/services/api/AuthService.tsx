import { IUserAuth, IUserConfirm } from '../../types/user';
import { BaseService } from './BaseService';

// import { IUserAuth } from '../types/user';

class AuthAPIService extends BaseService {
  private storage: Storage;

  private contentType = {
    'Content-Type': 'application/json',
  };

  constructor() {
    super();
    this.storage = localStorage;
  }

  public async signUp(profile: IUserAuth) {
    return this.post('users/', profile);
  }

  public async confirmRegistration(profile: IUserConfirm) {
    return this.post('users/activation/', profile);
  }

  public async getUsers(profile: IUserAuth) {
    return this.get('users/');
  }

  public async deleteUser(id: number) {
    return this.remove(`users/${id}`);
  }
}

export const AuthService = new AuthAPIService();
