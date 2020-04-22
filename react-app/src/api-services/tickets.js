import config from '../config.js';

class TicketsApiService {
  static getTickets() {
    let authToken = sessionStorage.getItem('AuthToken')
    return fetch(config.api.URL + "/tickets", {
      method: "GET",
      headers: {
        "Authorization": "Bearer "+authToken,
      }
    })
    .then(res => res.json())
  }

  static getTicket(id) {
    let authToken = sessionStorage.getItem('AuthToken')
    return fetch(config.api.URL + "/tickets/" + id, {
      method: "GET",
      headers: {
        "Authorization": "Bearer "+authToken,
      }
    })
    .then(res => res.json())
  }

  static postTickets(obj) {
    return fetch(config.api.URL + "/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(obj),
    })
    .then(res => res.json())
  }

  static deleteTickets(id) {
    return fetch(config.api.URL + "/tickets/" + id, {
      method: "DELETE",
      credentials: "include",
    })
    .then(res => res);
  }
}

export default TicketsApiService;
