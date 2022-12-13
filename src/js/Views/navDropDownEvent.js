class NavDropDownEvent {
  constructor() {
    this._parentElements = document.querySelectorAll('.header-fixed-nav-item')
    this._parentElement = null
  }
  // 发布移入事件
  addHandlerMouseenter(handler) {
    this._parentElements.forEach((val) => {
      val.addEventListener('mouseenter', (e) => {
        this._parentElement = e.target
        this._alterStateMouseenter()
        const str = this.tagJudgment()
        handler(str)
      })
    })
  }
  // 发布移出事件
  addHandlerMouseleave(handler) {
    this._parentElements.forEach((val) => {
      val.addEventListener('mouseleave', (e) => {
        this._parentElement = e.target
        this._alterStateMouseleave()
        handler()
      })
    })
  }
  // 判断移入哪个标签
  tagJudgment() {
    const index = Array.from(this._parentElements).indexOf(this._parentElement)
    switch (index) {
      case 0:
        return 'pigeonhole'
      case 1:
        return 'classify'
      case 2:
        return 'concerning'
      default:
        return
    }
  }
  // 移入-标签变化
  _alterStateMouseenter() {
    this._parentElements.forEach((val) => {
      val.querySelector('.btn').dataset.choose = 'neutrality'
    })
    this._parentElement.querySelector('.btn').dataset.choose = 'true'
  }
  // 移出-标签变化
  _alterStateMouseleave() {
    this._parentElements.forEach((val) => {
      val.querySelector('.btn').dataset.choose = 'false'
    })
  }
}

export default new NavDropDownEvent()
