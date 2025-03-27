import { environment } from 'src/environments/environment';

const url = `${environment.api}/api/${environment.apiVersion}/`;

export const enpoints = {
  AUTH: url + 'auth',
  USER: url + 'users',
};
