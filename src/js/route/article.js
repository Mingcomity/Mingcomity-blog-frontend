import * as models from '../model.js'
class Article {
  constructor() {
    this._parentElement = document.querySelector('.main')
    this._data = models.model.home
    this.render()
    this._pageView = this._parentElement.querySelector('section-article')
  }
  _generateMarkup() {
    return `
  <section class="section-repute">
      <div class="container">
        <div class="repute" id="${
          this._data.art[0].typeName == '字节青训营'
            ? 'zijie'
            : this._data.art[0].typeName
        }">
          <div class="repute-content">
            <div class="repute-content-label">
              <span id="${
                this._data.art[0].typeName == '字节青训营'
                  ? 'zijie'
                  : this._data.art[0].typeName
              }" class="label">${this._data.art[0].typeName}</span>
            </div>
            <h1 class="repute-content-title">${this._data.art[0].title}</h1>
            <p class="repute-content-text">
            ${this._data.art[0].text}
            </p>
            <p class="repute-content-overview">${this._data.art[0].brief}</p>
          </div>
          <div class="repute-imgBox">
            <img
              src="${this._data.art[0].img}" / class="repute-imgBox-img">
          </div>
        </div>
      </div>
  </section>
  <section class="section-article">
    <div class="container article">
      <header class="article-header">
        <ul class="article-header-nav">
        ${this._generateNav()}
        </ul>
      </header>
      <main class="article-main">
      ${this._data.paging[0].text}
      </main>
      <header class="article-header">
      <ul class="article-header-nav article-header-nav-footer">
      ${this._generateFoo()}
      </ul>
      </header>
    </div>
  </section> 
    `
  }
  _generateNav() {
    if (JSON.parse(this._data.art[0].nav)) {
      return `${JSON.parse(this._data.art[0].nav)
        .map((val) => {
          return `
        <li>
        ${val.title} ${val.lists}
        </li>
        `
        })
        .join(' ')}`
    } else {
      return ` `
    }
  }
  _generateFoo() {
    if (JSON.parse(this._data.art[0].nav)) {
      return `${JSON.parse(this._data.art[0].nav)
        .filter((val, index) => {
          if (
            index == this._data.paging[0].page - 1 + 1 ||
            index == this._data.paging[0].page - 1 - 1
          ) {
            return true
          }
        })
        .map((val) => {
          return `<li>${val.title}</li>`
        })
        .join(' ')}`
    } else {
      return ` `
    }
  }
  render() {
    const markup = this._generateMarkup()
    this._parentElement.innerHTML = markup
  }
}

export default Article
