import Popup from "./Popup";
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this.image = document.querySelector(".popup-img__photo");
    this.text = document.querySelector(".popup-image__text");
  }
  openPopup(card) {
    super.openPopup();
    super.setEventListeners();
    this.image = card.link;
    this.text.textContent = card.name;
    this.image.alt = card.name;
  }
}
