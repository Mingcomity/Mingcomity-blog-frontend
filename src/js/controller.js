import { model } from './model.js'
import { fetchNav } from './model.js'
import navDropDownEvent from './Views/navDropDownEvent.js'
import navDropDownContent from './Views/navDropDownContent.js'
import mediaQueries from './Views/mediaQueries.js'
import mediaNavDropDownEvent from './Views/mediaNavDropDownEvent.js'
import mediaNavDropDownContent from './Views/mediaNavDropDownContent.js'
import formQuery from './Views/formQuery.js'
// import pageingQuery from './Views/pageingQuery.js'

// 下拉菜单动画
const controlDropDownBottom = async function (str) {
  try {
    model.nav[str] || (await fetchNav())
    // 获取菜单数据
    const data = model.nav[str]
    // 渲染DOM
    navDropDownContent.render(data)
    // 移进动画
    navDropDownContent.moveInTheAnimation()
  } catch (err) {
    console.error(err)
  }
}
// 上拉动画
const controlDropDownTop = function () {
  try {
    // 移出动画
    navDropDownContent.moveOutTheAnimation()
  } catch (err) {
    console.error(err)
  }
}
// 媒体查询
const controlMedia = function () {
  try {
    // 媒体查询事件 触发后 添加侧边栏弹出事件
    mediaQueries.addExpandMenuEvent()
  } catch (err) {
    console.error(err)
  }
}
// 展开动画
const controlMediaDropEvent = async function () {
  try {
    // 获取菜单数据
    model.nav[mediaNavDropDownEvent.tagJudgment()] || (await fetchNav())
    // 获取数据
    const data = model.nav[mediaNavDropDownEvent.tagJudgment()]
    // 渲染下拉DOM
    mediaNavDropDownContent.render(data)
    // 展开动画
    mediaNavDropDownContent.moveInTheAnimation()
  } catch (err) {
    console.error(err)
  }
}
// 关闭动画
const controlMediaCloseEvent = function () {
  try {
    mediaNavDropDownContent.moveOutTheAnimation()
  } catch (err) {
    console.error(err)
  }
}
// from 表单查询
const contrFormQuery = async function () {
  // 获取查询的内容
  const query = formQuery.getQuery()
  // 返回数据
  // const data = model.nav(query)
  // console.log(data)
  console.log(query)
}

// 兼容 flex-gap 处理
const checkFlexGap = function () {
  const flex = document.createElement('div')
  flex.style.display = 'flex'
  flex.style.flexDirection = 'column'
  flex.style.rowGap = '1px'

  flex.appendChild(document.createElement('div'))
  flex.appendChild(document.createElement('div'))

  document.body.appendChild(flex)
  let isSupported = flex.scrollHeight === 1
  flex.parentNode.removeChild(flex)
  // console.log(isSupported)

  if (!isSupported) document.body.classList.add('no-flexbox-gap')
}
const init = function () {
  navDropDownEvent.addHandlerMouseenter(controlDropDownBottom)
  navDropDownEvent.addHandlerMouseleave(controlDropDownTop)
  mediaQueries.addHandlerMatchMedia(controlMedia)
  mediaNavDropDownEvent.addHandlerClick(
    controlMediaDropEvent,
    controlMediaCloseEvent
  )
  formQuery.addHandlerUpload(contrFormQuery)
  // pageingQuery.addHandlerBlurClick(controlPagingQuery)
  checkFlexGap()
}
init()
