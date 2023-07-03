import Popup from "./modal";
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this.image = this.popup.querySelector(".popup-img__photo");
    this.text = this.popup.querySelector(".popup-image__text");
  }
  openPopup(card) {
    super.openPopup();
    super.setEventListeners();
    this.image = card.link;
    this.text.textContent = card.name;
    this.image.alt = card.name;
  }
}
