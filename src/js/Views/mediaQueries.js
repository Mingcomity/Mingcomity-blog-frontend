import View from './View'

class MediaQueries extends View {
  constructor() {
    super()
    this._parentElement = document.querySelector('.header-nav-btn')
    this._menu = document.querySelector('.header-nav')
  }
  // 发布媒体查询事件
  addHandlerMatchMedia(handler) {
    const mQuery = window.matchMedia('(max-width: 51em)')
    mQuery.matches && handler()
    mQuery.addEventListener('change', () => {
      if (mQuery.matches) {
        this.addExpandMenuEvent()
      } else {
        this._clearExpandMenuEven()
      }
    })
  }
  // 添加：展开菜单事件
  addExpandMenuEvent() {
    this._parentElement.onclick = async () => {
      if (this._parentElement.dataset.expand != 'true') {
        // debugger
        this._expandMenu()
        this._btnExpand()
        document.body.onclick = (event) => {
          this._judgmentClicks(event) && this._parentElement.click()
        }
      } else {
        document.body.onclick = null
        this._closeMenu()
        this._btnClose()
      }
    }
  }
  // 清除展开菜单事件
  _clearExpandMenuEven() {
    this._parentElement.onclick = null
  }
  // 展开菜单
  _expandMenu() {
    this._menu.dataset.expand = 'true'
  }
  // 关闭菜单
  _closeMenu() {
    this._menu.dataset.expand = 'false'
  }
  // 展开按钮
  _btnExpand() {
    this._parentElement.dataset.expand = 'true'
  }
  // 关闭按钮
  _btnClose() {
    this._parentElement.dataset.expand = 'false'
  }
  // 判断点击位置
  _judgmentClicks(event) {
    // 侧边
    const main = document.querySelector('.main')
    // 链接
    const items = document.querySelectorAll('.header-nav-nav .items')
    if (
      main.contains(event.target) ||
      Array.from(items).some((val) => {
        return val.contains(event.target)
      })
    ) {
      return true
    } else {
      return false
    }
  }
}

export default new MediaQueries()
