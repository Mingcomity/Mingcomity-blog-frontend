export default class View {
  constructor() {
    this._data
  }
  render(data) {
    this._data = data
    const markup = this._generateMarkup()
    this._parentElement.innerHTML = markup
    // console.log(markup)
    // this._clear()
    // this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }
}
