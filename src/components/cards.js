export default class Card {
  constructor({
    data,
    userId,
    handleDeleteCard,
    handleLikeStatus,
    showPopupPhotoScale,
    templateSelector,
    handleLikeStatusDelete,
  }) {
    this.data = data;
    this.name = data.name;
    this.link = data.link;
    this.Id = userId;
    this.ownerId = data.owner._id;
    this.handleDeleteCard = handleDeleteCard;
    this.handleLikeStatus = handleLikeStatus;
    this.handleLikeStatusDelete = handleLikeStatusDelete;
    this._templateSelector = templateSelector;
    this.likes = data.likes;
    this.showPopupPhotoScale = showPopupPhotoScale;
  }
  //получение темплейт элемента
  _getTemplateElement() {
    const templateElement = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
    return templateElement;
  }
  //удаление карточи
  deleteCards() {
    this.cardElement.remove();
  }
  //обновление лайка
  updateLike(likes) {
    this.likes = likes;
    this._statusLikeUpdate();
  }

  //генерация карточки
  generate() {
    this.placeElement = this._getTemplateElement();
    this.elementImg = this.placeElement.querySelector(".element__photo");
    this.elementTitle = this.placeElement.querySelector(".element__title");
    this.elementTrash = this.placeElement.querySelector(".element__delete");
    this.elementLike = this.placeElement.querySelector(".element__like");
    this.cardElement = this.placeElement.querySelector(".element");
    this.likeEnumerator = this.placeElement.querySelector(
      ".element__like_enumerator"
    );
    this.likeEnumerator.textContent = this.likes.length;
    this.elementImg.src = this.link;
    this.elementImg.alt = this.name;
    this.elementTitle.textContent = this.name;
    this._setEventListeners();
    if (this.ownerId !== this.Id) {
      this.elementTrash.remove();
    }
    this._statusLikeUpdate();
    return this.placeElement;
  }
// проверка на лайк
  _isLiked = () => {
    return this.likes.find((data) => {
      return data._id === this.Id;
    });
  };
  //проверка лайка при загрузке страницы 
  _statusLikeUpdate() {
    this.likeEnumerator.textContent = this.likes.length;
    if (this._isLiked()) {
      this.elementLike.classList.add("element__like_active");
    } else {
      this.elementLike.classList.remove("element__like_active");
    }
  }
//добавление слушателя событий(лайку,корзине,картинке)
  _setEventListeners() {
    this.elementTrash.addEventListener("click", () =>
      this.handleDeleteCard(this.data._id)
    );
    this.elementLike.addEventListener("click", () => {
      if (this._isLiked()) {
        this.handleLikeStatusDelete();
      } else {
        this.handleLikeStatus();
      }
    });
    this.elementImg.addEventListener("click", () =>
      this.showPopupPhotoScale(this.data)
    );
  }
}
