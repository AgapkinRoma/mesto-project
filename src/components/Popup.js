export default class Popup {
  constructor(popup) {
    this.popup = popup;
  }
  //открытие попапа
  openPopup() {
    this.popup.classList.add("popup_opened");
    window.addEventListener("keydown", this._handleEscClose);
  }
//закрытие попапа
  closePopup() {
    this.popup.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._handleEscClose);
  }
  //закрытие попапа кнопкой ESC
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  };
  setEventListeners() {
    this.popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.closePopup();
      }
      if (evt.target.classList.contains("popup__close")) {
        this.closePopup();
      }
    });
  }
}
