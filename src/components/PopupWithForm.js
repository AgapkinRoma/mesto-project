import Popup from "./Popup";
export default class PopupWithForm extends Popup {
  constructor({ popup, callbackFormSubmit }) {
    super(popup);
    this.callbackFormSubmit = callbackFormSubmit;
    this.form = this.popup.querySelector(".form");
    this.inputs = this.form.querySelectorAll(".form__input");
    this.button = this.popup.querySelector(".popup__submit");
    this.buttonText = this.button.textContent;
  }
  _getInputValues() {
    this.inputList = {};
    this.inputs.forEach((input) => {
      this.inputList[input.name] = input.value;
    });
    return this.inputList;
  }
  close() {
    this.form.reset();
    super.close();
  }
  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.callbackFormSubmit(this._getInputValues());
    });
  }
  _buttonLoadingText(load) {
    this.button.textContent = load ? "Сохранение..." : this.buttonText;
  }
}
