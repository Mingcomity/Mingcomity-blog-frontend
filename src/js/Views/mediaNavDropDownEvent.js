class mediaNavDropDownEvent {
  constructor() {
    this._parentElements = document.querySelectorAll(
      '.header-nav-nav .btn:not(:last-child)'
    )
    this._parentElement = null
  }
  // 移动端点击下拉菜单事件
  addHandlerClick(handlerExpand, handlerClose) {
    this._parentElements.forEach((val) => {
      val.addEventListener('click', (e) => {
        this._parentElement = e.target
        if (this._parentElement.dataset.choose == 'false') {
          handlerExpand()
          this._expandList()
        } else {
          handlerClose()
          this._closeList()
        }
      })
    }, false)
  }
  // 判断移入哪个标签
  tagJudgment() {
    const index = Array.from(this._parentElements).indexOf(this._parentElement)
    switch (index) {
      case 0:
        return 'pigeonhole'
      case 1:
        return 'classify'
      default:
        return
    }
  }
  // 展开
  _expandList() {
    this._parentElement.dataset.choose = 'true'
  }
  // 关闭
  _closeList() {
    this._parentElement.dataset.choose = 'false'
  }
}

export default new mediaNavDropDownEvent()
