class formQuery {
  constructor() {
    this._parentElements = document.querySelectorAll('.form')
    this._input = null
  }
  getQuery() {
    const query = String(this._input.value).trim()
    this._clearInputValue()
    return query
  }
  _clearInputValue() {
    this._input.value = ''
  }
  addHandlerUpload(handler) {
    this._parentElements.forEach((val) =>
      val.addEventListener('submit', (e) => {
        this._input = e.target.querySelector('input')
        e.preventDefault()
        handler()
      })
    )
  }
}

export default new formQuery()
