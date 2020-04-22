import config from '../config.js';

class AuthApiService  {
  static getAuth() {
    return fetch(config.api.URL + "/auth", {
      credentials: "include",
    })
    .then(res => res.json())
  }

  static postAuthLogin(email, password) {
    let formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    return fetch(config.api.URL + "/login", {
      method: "POST",
      body: formData
    })
    .then(res => {
      const statusCode = res.status;
      const data = res.json();
      return Promise.all([statusCode, data]);
    })
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
