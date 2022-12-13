import { API_URL } from './config.js'
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js'
export const model = {
  nav: {
    pigeonhole: null,
    classify: null,
    concerning: {
      index: 2,
      data: `<div class="header-eject--tab1">
      <div class="header-eject--tab1-title">
        <h2 class="title">
          <span class="border">向往</span>星辰与大海的
        </h2>
        <h2 class="title">互联网民工</h2>
        <p class="smallIcons">ming comity</p>
      </div>
      <div class="header-eject--tab1-text">
        <figure class="figure">
          <div class="figure-icons">
            <span class="iconfont icon-HTML"></span>
          </div>
          <div class="figure-title">
            <figcaption class="title">Web前端</figcaption>
            <p class="text">可见即所得的可视化开发，即兴收获感</p>
          </div>
        </figure>
        <figure class="figure">
          <div class="figure-icons">
            <span class="iconfont icon-camera"></span>
          </div>
          <div class="figure-title">
            <figcaption class="title">摄影</figcaption>
            <p class="text">
              美好的景色转瞬即逝，星辰的辉光遥不可及
            </p>
          </div>
        </figure>
        <figure class="figure">
          <div class="figure-icons">
            <span class="iconfont icon-travel"></span>
          </div>
          <div class="figure-title">
            <figcaption class="title">旅行</figcaption>
            <p class="text">
              祖国大好河山风景秀丽，拎起行李走一走
            </p>
          </div>
        </figure>
        <figure class="figure">
          <div class="figure-icons">
            <span class="iconfont icon-yun"></span>
          </div>
          <div>
            <figcaption class="title">sky</figcaption>
            <p class="text" style="opacity: 0">
              &nbsp;❤&nbsp;❤&nbsp;❤争取中！
            </p>
          </div>
        </figure>
      </div>
    </div>
    `
    }
  }
}
export const fetchNav = async function () {
  try {
    const data = await AJAX(`${API_URL}/fetch`)
    model.nav.pigeonhole = data.data.pigeonhole
    model.nav.classify = data.data.classify
  } catch (error) {
    console.error(error)
  }
}
export const fetchHome = async function (page = 1) {
  try {
    const data = await AJAX(`${API_URL}/home/${page}`)
    if (data.data.paging.length == 0) return false
    model.home = data.data
    return true
  } catch (err) {
    console.error(err)
  }
}
export const fetchSeries = async function (query) {
  try {
    const id = query.id ? query.id : 1
    const page = query.page ? query.page : 1
    const data = await AJAX(`${API_URL}/series?id=${id}&page=${page}`)
    if (data.data.paging.length == 0) return false
    model.home = data.data
    return true
  } catch (err) {
    console.error(err)
  }
}
export const fetchDate = async function (query) {
  try {
    const period = query.period ? query.period : 1
    const page = query.page ? query.page : 1
    const data = await AJAX(`${API_URL}/date?period=${period}&page=${page}`)
    if (data.data.paging.length == 0) return false
    model.home = data.data
    return true
  } catch (err) {
    console.error(err)
  }
}
export const fetchArt = async function (query) {
  try {
    const article = query.article ? query.article : 1
    const page = query.page ? query.page : 1
    const data = await AJAX(
      `${API_URL}/article?article=${article}&page=${page}`
    )
    if (data.data.paging.length == 0) return false
    model.home = data.data
    return true
  } catch (err) {
    console.error(err)
  }
}
