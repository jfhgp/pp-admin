import localStore from './localstore.util';
import { updateHeaders } from '../service/HttpProvider';

export const getToken = () => localStore.get_data('token');

export const setToken = token => localStore.store_data('token', token);

export const getCurrentLocation = () => localStore.get_data('location');

export const setCurrentLocation = location => localStore.store_data('location', location);

export const getUser = () => localStore.get_data('user');

export const saveUser = user => localStore.store_data('user', user);

export const logout = async () => {
  await localStore.remove_data('token');
  await updateHeaders();
  return true;
};

class Auth {
  constructor() {
    this.user = {};
  }

  async setUserFromLocal() {
    const user = await getToken();
    this.user = user ? user : {};
  }

  set setUser(user) {
    this.user = user;
  }

  get getUser() {
    return this.user;
  }

  async logout() {
    await logout();
    this.user = {};
  }
}

export const authClass = new Auth();
