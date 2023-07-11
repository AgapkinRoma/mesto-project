export default class Section {
  constructor({ renderer }, containerSelector) {
    this.renderer = renderer;
    this.containerSelector = containerSelector;
  }
//рендер карточек
  rendererItems(items) {
    items.forEach((item) => this.renderer(item));
  }
  //добавление карточки перед дочерним элементом
  addItemPrepend(item) {
    this.containerSelector.prepend(item);
  }
  //добавление карточки в конец дочернего элемента
  addItemAppend(item) {
    this.containerSelector.append(item);
  }
}
