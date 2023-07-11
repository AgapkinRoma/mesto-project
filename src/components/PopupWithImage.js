import Popup from "./Popup";
export default class PopupWithImage extends Popup {
  constructor({ popup }) {
    super(popup);
    this.image = document.querySelector(".popup-img__photo");
    this.text = document.querySelector(".popup-img__text");
  }
  //открытие попапа картинки
  openPopup(card) {
    super.openPopup();
    this.image.src = card.link;
    this.text.textContent = card.name;
    this.image.alt = card.name;
  }
}
