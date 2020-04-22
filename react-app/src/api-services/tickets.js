import config from '../config.js';

class TicketsApiService {
  static getNearTickets() {
    let authToken = sessionStorage.getItem('AuthToken')
    return fetch(config.api.URL + "/tickets", {
      method: "GET",
      headers: {
        "Authorization": "Bearer "+authToken,
      }
    })
    .then(res => res.json())
  }

  static getMyTickets() {
    let authToken = sessionStorage.getItem('AuthToken')
    return fetch(config.api.URL + "/tickets/mine", {
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

  static postNewTicket(title, description) {
    let authToken = sessionStorage.getItem('AuthToken')
    console.log(authToken);
    let formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);

    return fetch(config.api.URL + "/tickets", {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": "Bearer "+authToken,
      }
    })
    .then(res => {
      const statusCode = res.status;
      const data = res.json();
      return Promise.all([statusCode, data]);
    })
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
