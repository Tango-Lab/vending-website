import { AuthStorageKey } from '@/constants/Storage';
import { AccessToken } from '@/models/AccessToken';
import { IAuthLogin } from '@/schema';
import { login } from '@/service/authentication';

export const handleSubmitLogin = (param: IAuthLogin): Promise<AccessToken> => {
  return login(param)
    .then((response) => {
      localStorage.setItem(AuthStorageKey, JSON.stringify(response));
      return response;
    })
    .catch((err) => {
      throw err;
    });
};
