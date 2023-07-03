///servak
export default class Api {
  constructor(options) {
    this.basicUrl = options.basicUrl;
    this.headers = options.headers;
  }
  _onResponse(res) {
    return res.ok
      ? res.json()
      : res.json().then((data) => Promise.reject(`Ошибка${data.status}`));
  }
  userData() {
    return fetch(`${this.basicUrl}/users/me`, {
      headers: this.headers,
    }).then(this._onResponse);
  }
  getAllCards() {
    return fetch(`${this.basicUrl}/cards`, {
      headers: this.headers,
    }).then(this._onResponse);
  }
  getAllData() {
    return Promise.all([this.userData(), this.getAllCards()]).then(
      this._onResponse
    );
  }
  editUserProfile(data) {
    return fetch(`${this.basicUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._onResponse);
  }
  addCard(data) {
    return fetch(`${this.basicUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this._onResponse);
  }
  deleteCard(data) {
    return fetch(`${this.basicUrl}/cards/${data}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._onResponse);
  }
  changelikeStatus(data, isLike) {
    return fetch(`${this.basicUrl}/cards/likes${data}`, {
      method: isLike ? "DELETE" : "PUT",
      headers: this.headers,
    }).then(this._onResponse);
  }
  changeAvatar(profileAvatar) {
    return fetch(`${this.basicUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar: profileAvatar.value }),
    }).then(this._onResponse);
  }
}
