//импорты
import { handleDeleteCard, handleLikeStatus } from "../index.js";

//объявление переменных
export const popupPhotoScale = document.querySelector(".popup-img");
export const popupImgPhoto = document.querySelector(".popup-img__photo");
export const popupImgText = document.querySelector(".popup-img__text");
export const placesContainer = document.querySelector(".elements");

//функция проверки постановки лайка
function isLiked(likes, userId) {
  return likes.find((like) => {
    return like._id === userId;
  });
}

//функция обновлениея статуса лайка
export function statusLikeUpdate(cardElement, likes, userId) {
  const elementLike = cardElement.querySelector(".element__like");
  const likeEnumerator = cardElement.querySelector(".element__like_enumerator");
  likeEnumerator.textContent = likes.length;
  if (isLiked(likes, userId)) {
    elementLike.classList.add("element__like_active");
  } else {
    elementLike.classList.remove("element__like_active");
  }
}

//функция создания карточки
export function createCard(data, container, userId) {
  const placeElement = getCard(
    data,
    userId,
    handleDeleteCard,
    handleLikeStatus
  );
  container.prepend(placeElement);
}
//функция открытия попапа "Увиличение картинки"
export function showPopupPhotoScale(img, title) {
  openPopup(popupPhotoScale);
  popupImgPhoto.src = img.src;
  popupImgPhoto.alt = `${title}.`;
  popupImgText.textContent = title;
}
//функция получения карточки
export function getCard(data, userId, handleDeleteCard, handleLikeStatus) {
  const placeTemplate = document.querySelector("#element-template").content;
  const placeElement = placeTemplate.cloneNode(true);
  const elementImg = placeElement.querySelector(".element__photo");
  const elementTitle = placeElement.querySelector(".element__title");
  const elementTrash = placeElement.querySelector(".element__delete");
  const elementLike = placeElement.querySelector(".element__like");
  const cardElement = placeElement.querySelector(".element");
  elementTitle.textContent = data.name;
  elementImg.src = data.link;
  elementImg.alt = data.name;
  statusLikeUpdate(cardElement, data.likes, userId);
  elementTrash.addEventListener("click", () =>
    handleDeleteCard(data._id, cardElement)
  );
  elementLike.addEventListener("click", () =>
    handleLikeStatus(
      data._id,
      elementLike.classList.contains("element__like_active"),
      cardElement
    )
  );
  elementImg.addEventListener("click", () =>
    showPopupPhotoScale(elementImg, data.name)
  );
  if (data.owner._id !== userId) {
    elementTrash.remove();
  }
  return placeElement;
}

//функция удаления карточки
export function deleteElement(element) {
  element.remove();
}

//функция лайка карточки
export function likeElement(like) {
  like.classList.toggle("element__like_active");
}

export default class Card {
  constructor({
    data,
    userId,
    handleDeleteCard,
    handleLikeStatus,
    templateSelector,
    showPopupPhotoScale,
  }) {
    this.data = data;
    this.name = data.name;
    this.link = data.link;
    this.Id = userId._id;
    this.ownerId = data.owner_.id;
    this.handleDeleteCard = handleDeleteCard;
    this.handleLikeStatus = handleLikeStatus;
    this._templateSelector = templateSelector;
    this.like = data.like;
    this.enumerator = data.enumerator;
    this.showPopupPhotoScale = showPopupPhotoScale;
  }
  _getTemplateElement() {
    const templateElement = document.querySelector(
      this._templateSelector
    ).content;
    const cardElement = templateElement.cloneNode(true);
    return cardElement;
  }
  _isLiked() {
    return this.likes.find((like) => {
      return like._id === this.Id;
    });
  }
  _statusLikeUpdate(data) {
    this._likes = data.likes;
    this.likeEnumerator.textContent = data.likes.length;
    if (this._isLiked()) {
      this.elementLike.classList.add("element__like_active");
    } else {
      this.elementLike.classList.remove("element__like_active");
    }
  }
  _setEventListeners() {
    this._elementTrash.addEventListener("click", () =>
      handleDeleteCard(this.data._id, this.cardElement)
    );
    this._elementLike.addEventListener("click", () =>
      this.handleLikeStatus(
        this.data._id,
        this.elementLike.classList.contains("element__like_active"),
        this.cardElement
      )
    );
    this._elementImg.addEventListener("click", () =>
      this.showPopupPhotoScale(this.elementImg, this.data.name)
    );
  }
  generate() {
    this.placeElement = this._getTemplateElement();
    this.elementImg =
      this.placeElement.document.querySelector(".element__photo");
    this.elementTitle =
      this.placeElement.document.querySelector(".element__title");
    this.elementTrash =
      this.placeElement.document.querySelector(".element__delete");
    this.elementLike =
      this.placeElement.document.querySelector(".element__like");
    this.cardElement = this.placeElement.document.querySelector(".element");
    this.elementImg.src = this.link;
    this.elementImg.alt = this.name;
    this.elementTitle.textContent = this.name;
    this._setEventListeners();

    if (this.ownerId !== this.Id) {
      this.elementTrash.remove();
    }
    return this.placeElement;
  }
}
