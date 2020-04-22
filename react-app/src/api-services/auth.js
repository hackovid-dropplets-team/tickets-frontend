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

  static postAuthRegister(username, mail, password, latitude, longitude, radiAccio) {
    let formData = new FormData();

    formData.append('name', username);
    formData.append('email', mail);
    formData.append('password', password);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('action_radius', radiAccio);

    return fetch(config.api.URL + "/register", {
      method: "POST",
      body: formData,
    })
    .then(res => {
      const statusCode = res.status;
      const data = res.json();
      return Promise.all([statusCode, data]);
    })
  }

  static getAuthLogout() {
    return fetch(config.api.URL + "/auth/logout", {
      credentials: "include",
    })
  }
}

export default AuthApiService;
