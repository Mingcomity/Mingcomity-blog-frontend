import PagingQuery from '../Views/pagingQuery.js'
import * as models from '../model.js'
class Date {
  constructor() {
    this._parentElement = document.querySelector('.main')
    this._data = models.model.home
    this.render()
    this._pageView = this._parentElement.querySelector(
      '.section-latest .latest-main'
    )

    // 页码控制
    const pagingQuery = new PagingQuery()
    // 监听页码变化
    const controlPagingQuery = async () => {
      try {
        const page = pagingQuery.getPage()
        // 判断新页码是否能访问到值
        const whether = await models.fetchDate({
          period: this._data.period,
          page
        })
        whether || pagingQuery.backPage()
        this._data = models.model.home
        this.renderPage()
      } catch (err) {
        console.error(err)
      }
    }
    pagingQuery.addHandlerBlurClick(controlPagingQuery)
  }
  _generateMarkup() {
    return `
    <section class="section-home">
        <div class="container">
          <div class="home">
            <div class="home-content">
              <p class="home-content-text">CREATOR & BLOGGER</p>
              <h1 class="home-content-title">刘文麟的博客</h1>
            </div>
          </div>
        </div>
    </section>
      <section class="section-latest">
        <div class="latest container">
          <header class="latest-header">
            <h2 class="latest-title">最新</h2>
            <div class="latest-page">
              <button class="latest-page-btn" id="latest-page-left">
                <span class="iconfont icon-arrow-left"></span>
              </button>
              <input type="text" value="1" class="latest-page-number"></input>
              <button class="latest-page-btn" id="latest-page-right">
                <span class="iconfont icon-arrow-right"></span>
              </button>
            </div>
          </header>
          <main class="latest-main">
            <div class="latesr-lists">
              ${this._data.paging
                .map((val) => {
                  return `
                <a class="moveUp-brighten" href='javascript:void(0);' onclick='linkTo("${
                  val.href
                }")'>
                <figure class="latesr-list">
                  <div class="latesr-list-img-box">
                    <img
                      src="${val.img}"
                      alt="观赏图" class="latesr-list-img" />
                  </div>
                  <div class="latesr-list-content">
                    <div class="latesr-list-content-label">
                      <span id="${
                        val.typeName == '字节青训营' ? 'zijie' : val.typeName
                      }" class="label">${val.typeName}</span>
                    </div>
                    <figcaption class="latesr-list-content-title">
                    ${val.title}
                    </figcaption>
                    <p class="latesr-list-content-overview">
                    ${val.brief}
                    </p>
                  </div>
                </figure>
              </a>
                `
                })
                .join(' ')}
            </div>
          </main>
        </div>
      </section>
    `
  }

  _generatePageMarkup() {
    return `

    <main class="latest-main">
      <div class="latesr-lists">
        ${this._data.paging
          .map((val) => {
            return `
          <a class="moveUp-brighten" href='javascript:void(0);' onclick='linkTo("${
            val.href
          }")'>
          <figure class="latesr-list">
            <div class="latesr-list-img-box">
              <img
                src="${val.img}"
                alt="观赏图" class="latesr-list-img" />
            </div>
            <div class="latesr-list-content">
              <div class="latesr-list-content-label">
                <span id="${
                  val.typeName == '字节青训营' ? 'zijie' : val.typeName
                }" class="label">${val.typeName}</span>
              </div>
              <figcaption class="latesr-list-content-title">
              ${val.title}
              </figcaption>
              <p class="latesr-list-content-overview">
              ${val.brief}
              </p>
            </div>
          </figure>
        </a>
          `
          })
          .join(' ')}
      </div>
    </main>

    `
  }
  render() {
    const markup = this._generateMarkup()
    this._parentElement.innerHTML = markup
  }
  renderPage() {
    const markup = this._generatePageMarkup()
    this._pageView.innerHTML = markup
  }
}

export default Date
