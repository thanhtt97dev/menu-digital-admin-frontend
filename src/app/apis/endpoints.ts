import { environment } from 'src/environments/environment';

// Backend not support api versioning
const url = `${environment.api}/`;
// const url = `${environment.api}/api/${environment.apiVersion}/`;

export const enpoints = {
  AUTH: url + 'auth',
  USER: url + 'users',
};
