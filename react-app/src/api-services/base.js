import config from '../config.js';

class BaseApiService {
  static getHeaders() {
    return {
      "Content-Type": "application/json",
    }
  }

  static getBaseUrl() {
    return config.api.URL;
  }

  static get(url) {
    return fetch(
      `${this.getBaseUrl()}/${url}/`, {
        method: "GET",
        headers: this.getHeaders(),
      }
    ).then(res => res.json());
  }

  static post(url, body) {
    return fetch(
      `${this.getBaseUrl()}/${url}/`, {
        method: "POST",
        headers: this.getHeaders(),
        body
      }
    ).then(res => res.json());
  }

  static put(url, body) {
    return fetch(
      `${this.getBaseUrl()}/${url}/`, {
        method: "PUT",
        headers: this.getHeaders(),
        body
      }
    ).then(res => res.json());
  }

  static delete(url) {
    return fetch(
      `${this.getBaseUrl()}/${url}/`, {
        method: "DELETE",
        headers: this.getHeaders(),
      }
    ).then(res => res.json());
  }
}

export default BaseApiService;
