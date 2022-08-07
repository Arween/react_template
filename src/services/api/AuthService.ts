import { IUserAuth, IUserConfirm } from '../../types/user';
import { GuestService } from './GuestService';

// import { IUserAuth } from '../types/user';

class AuthAPIService extends GuestService {
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

  public async refreshToken(refreshToken: string) {
    const data = new FormData();

    data.append('refresh', refreshToken);

    return this.post('jwt/refresh/', data);
  }
}

export const AuthService = new AuthAPIService();
