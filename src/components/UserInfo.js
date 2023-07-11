export default class UserInfo {
  constructor(name, about, avatar) {
    this.name = document.querySelector(name);
    this.about = document.querySelector(about);
    this.avatar = document.querySelector(avatar);
  }
//получение данных профиля(имя,статус)
  getUserInfo() {
    return {
      name: this.name.textContent,
      about: this.about.textContent,
    };
  }
//установка данных профиля(имя,статус)
  setUserInfo(data) {
    this.name.textContent = data.name;
    this.about.textContent = data.about;
  }
//установка аватара
  setAvatar(data) {
    this.avatar.src = data.avatar;
  }

}
