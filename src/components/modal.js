export default class Popup {
  constructor(popup) {
    this.popup = popup;
    this.popups = this.popup.querySelectorAll(".popup");
  }
  openPopup() {
    this.popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  closePopup() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }
  setEventListeners() {
    this.popups.forEach((popup) => {
      popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
          this.closePopup();
        }
        if (evt.target.classList.contains("popup__close")) {
          this.closePopup();
        }
      });
    });
  }
}
