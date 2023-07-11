import Popup from "./Popup";
export default class PopupWithForm extends Popup {
  constructor({ popup, callbackFormSubmit }) {
    super(popup);
    this.callbackFormSubmit = callbackFormSubmit;
    this.form = this.popup.querySelector(".form");
    this.inputs = this.form.querySelectorAll(".form__input");
    this.button = this.form.querySelector(".popup__submit");
  }
  //получение данных из инпутов
  _getInputValues() {
    this.inputList = {};
    this.inputs.forEach((input) => {
      this.inputList[input.name] = input.value;
    });
    return this.inputList;
  }
  //закрытие попапа формы
  closePopup(evt) {
    super.closePopup(evt);
    this.form.reset();
  }
  //добавление слушателя событий форме
  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.callbackFormSubmit(this._getInputValues());
    });
  }
  //текс кнопки при обработке
  buttonLoading(disabled) {
    if (disabled) {
      this.button.disabled = true;
      this.button.textContent = "Сохраняем...";
    } else {
      this.button.disabled = false;
      this.button.textContent = "Сохранить";
    }
  }
  setInputValues() {
    this.inputList = {}
    this.inputs.forEach((input) => {
      input.value = [input.name];
    });
    return this.inputList
  }
}
