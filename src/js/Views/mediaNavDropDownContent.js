import View from './View'

class mediaNavDropDownContent extends View {
  constructor() {
    super()
    this._parentElements = document.querySelectorAll('.header-nav-nav .items')
    this._parentElement = null
  }
  _generateMarkup() {
    console.log(this._data)
    this._parentElement = this._parentElements[this._data.index]
    return `
    ${this._data.data
      .map((val) => {
        return `
        <li class="item">
        <a href="${val.href}" id="${val.id}">${val.name}</a>
        </li>`
      })
      .join(' ')}
    `
  }
  moveInTheAnimation() {
    this._parentElement.dataset.unfold = 'carryOut'
  }
  moveOutTheAnimation() {
    this._parentElement.dataset.unfold = 'shutDown'
    this._parentElement.addEventListener('animationend', function () {
      if (this.dataset.unfold == 'shutDown') {
        this.dataset.unfold = 'false'
      }
    })
  }
}

export default new mediaNavDropDownContent()
