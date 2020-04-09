import config from '../config.js';
import BaseApiService from './base-api.js';

class AuthApiService  {
  static getAuth() { 
    return fetch(config.api.URL + "/auth", {
      // credentials: "include",
    })
    .then(res => res.json())
  }

  static postAuthLogin(username, password) {
    return BaseApiService.post( "login", JSON.stringify({
      "username": username,
      "password": password
    })).then(res => {console.log(res);});
  }

  static postAuthRegister(username, password) {
    return fetch(config.api.URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        "username": username,
        "password": password
      }),
    })
    .then(res => res.json())
  }

  static getAuthLogout() {
    return fetch(config.api.URL + "/auth/logout", {
      credentials: "include",
    })
  }
}

export default AuthApiService;
