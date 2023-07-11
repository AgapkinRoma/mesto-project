export default class FormValidator {
  constructor(validObject, validform) {
    this.validObject = validObject;
    this.validform = validform;
    this.inputs = this.validform.querySelectorAll(
      this.validObject.inputSelector
    );
    this.inputsArray = Array.from(this.inputs);
    this.sButton = this.validform.querySelector(
      this.validObject.submitButtonSelector
    );
    this.error = this.validform.querySelectorAll(this.validObject.errorSpan);
  }
  //демонстрация ошибки валидации
  _showInputError(inputElement, errorMessage) {
    const popupError = this.validform.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this.validObject.inputErrorClass);
    popupError.classList.add(this.validObject.errorClass);
    popupError.textContent = errorMessage;
  }
  //скрытие ошибки валидации
  _hideInputError(inputElement) {
    const popupError = this.validform.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this.validObject.inputErrorClass);
    popupError.classList.remove(this.validObject.errorClass);
    popupError.textContent = "";
  }
  //проверка инпутов на валидацию
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
  }
  //добавление слушателя событий на инпут
  _setEventListeners() {
    this._toggleButtonState();
    this.inputsArray.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }
  //отключение кнопки
  _disableButton() {
    this.sButton.classList.add(this.validObject.inactiveButtonClass);
    this.sButton.disabled = true;
  }
  //проверка инпута на коректность
  _hasInvalidInput() {
    return this.inputsArray.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton(this.sButton, this.validObject);
    } else {
      this.sButton.disabled = false;
      this.sButton.classList.remove(this.validObject.inactiveButtonClass);
    }
  }
  
  enableValidation() {
    this._setEventListeners();
  }
  resetValidation(){
    this._toggleButtonState();
    this.inputs.forEach((input)=>{
      this._hideInputError(input)
    })
  }
}
