class PagingQuery {
  constructor() {
    this._reduce = document.querySelector('#latest-page-left')
    this._input = document.querySelector('.latest-page-number')
    this._add = document.querySelector('#latest-page-right')
    this._oldPage = undefined
  }
  // 注册事件
  addHandlerBlurClick(handler) {
    let valOld = undefined
    this._input.addEventListener('focus', () => {
      valOld = this._input.value
      this._oldPage = valOld
    })
    this._input.addEventListener('blur', () => {
      const valNew = this._input.value
      // d对新值进行判断是否合法
      if (!this._checkInput(valNew)) {
        // 不合法则返回原值
        this._input.value = valOld
        return
      }
      // 比较新值是否等于旧值，如果等于则退出函数，以免发起请求
      if (valNew == valOld) {
        return
      }
      handler()
    })
    this._add.addEventListener('click', () => {
      if (!this._addInput()) return
      handler()
    })
    this._reduce.addEventListener('click', () => {
      if (!this._reduceInput()) return
      handler()
    })
  }
  // 获取val值
  getPage() {
    return this._input.value
  }
  // 返回旧值
  backPage() {
    this._input.value = this._oldPage
  }
  // 检测数据是否合法
  _checkInput(val) {
    const pattern = /^[1-9]\d*$/
    if (pattern.test(val)) {
      return true
    } else {
      return false
    }
  }
  // 加
  _addInput() {
    let val = this._input.value
    this._oldPage = val
    val++
    this._checkInput(val) && this._input.value++
    return this._checkInput(val)
  }
  // 减
  _reduceInput() {
    let val = this._input.value
    this._oldPage = val
    val--
    this._checkInput(val) && this._input.value--
    return this._checkInput(val)
  }
}
export default PagingQuery
