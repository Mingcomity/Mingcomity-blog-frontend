import View from './View'

class NavDropDownContent extends View {
  constructor() {
    super()
    this._parentElements = document.querySelectorAll('.header-eject')
    this._parentElement = null
  }
  // 返回渲染内容
  _generateMarkup() {
    this._parentElement = this._parentElements[this._data.index]
    switch (this._data.index) {
      case 0:
        return `
        <div class="header-eject--tab2">
          <div class="header-eject--tab2-nav" data-choose="false">
            <h5 class="header-eject--tab2-title">date</h5>
            <ul class="items">
              ${this._data.data
                .map((val) => {
                  return `
                   <li>
                     <a class="item" data-choose="false" href='javascript:void(0);' onclick='linkTo("${val.href}")' data-id="${val.id}">
                       <h6 class="title">${val.name}</h6>
                       
                     </a>
                   </li>`
                })
                .join(' ')}
            </ul>
          </div>
          <div class="header-eject--tab2-lists" data-choose="false">
            <h5 class="header-eject--tab2-title">article</h5>
            <ul class="items">
            ${this._data.data[0].article
              .map((val) => {
                return `
                 <li>
                   <a class="item" data-choose="false" href='javascript:void(0);' onclick='linkTo("${val.href}")'>
                     <h6 class="title">${val.title}</h6>
                     <p class="text">
                         ${val.brief}
                       </p>
                   </a>
                 </li>`
              })
              .join(' ')}
            </ul>
          </div>
          <div class="header-eject--tab2-recently" data-choose="false">
            <h5 class="header-eject--tab2-title">recently</h5>
            <ul class="items">
            ${this._data.recently
              .map((val) => {
                return `
                 <li>
                   <a class="item" data-choose="false" href='javascript:void(0);' onclick='linkTo("${val.href}")'>
                     <h6 class="title">${val.title}</h6>
                     <p class="text">
                       ${val.brief}
                     </p>
                   </a>
                 </li>`
              })
              .join(' ')}
            </ul>
          </div>
        </div>
        `
      case 1:
        return `
        <div class="header-eject--tab2">
          <div class="header-eject--tab2-nav" data-choose="false">
            <h5 class="header-eject--tab2-title">class</h5>
            <ul class="items">
              ${this._data.data
                .map((val) => {
                  return `
                   <li>
                     <a class="item" data-choose="false" href='javascript:void(0);' onclick='linkTo("${val.href}")' data-id="${val.id}"> 
                       <h6 class="title">${val.name}</h6>
                       
                     </a>
                   </li>`
                })
                .join(' ')}
            </ul>
          </div>
          <div class="header-eject--tab2-lists" data-choose="false">
            <h5 class="header-eject--tab2-title">article</h5>
            <ul class="items">
            ${this._data.data[0].article
              .map((val) => {
                return `
                 <li>
                   <a class="item" data-choose="false" href='javascript:void(0);' onclick='linkTo("${val.href}")'>
                     <h6 class="title">${val.title}</h6>
                     <p class="text">
                       ${val.brief}
                     </p>
                   </a>
                 </li>`
              })
              .join(' ')}
            </ul>
          </div>
          <div class="header-eject--tab2-recently" data-choose="false">
            <h5 class="header-eject--tab2-title">recently</h5>
            <ul class="items">
            ${this._data.recently
              .map((val) => {
                return `
                 <li>
                   <a class="item" data-choose="false" href='javascript:void(0);' onclick='linkTo("${val.href}")'>
                     <h6 class="title">${val.title}</h6>
                     <p class="text">
                       ${val.brief}
                     </p>
                   </a>
                 </li>`
              })
              .join(' ')}
            </ul>
          </div>
        </div>
        `
      case 2:
        return this._data.data
      default:
        break
    }
  }
  // 展开动画
  moveInTheAnimation() {
    this._parentElement.style.display = 'block'
    this._parentElement.dataset.unfold = 'carryOut'
    this._fontColorChange()
    this._blockChangingColor()
    this._articleListRendering()
  }
  // 关闭动画
  moveOutTheAnimation() {
    this._parentElement.dataset.unfold = 'shutDown'
    this._parentElement.addEventListener('animationend', function () {
      if (this.dataset.unfold == 'shutDown') {
        this.style.display = 'none'
        this.dataset.unfold = 'false'
      }
    })
  }
  // 字体明暗变化
  _fontColorChange() {
    const lists = this._parentElement.querySelectorAll(
      '.header-eject--tab2>div'
    )
    // 字体变暗变亮
    lists.forEach((val) => {
      val.addEventListener('mouseenter', function (e) {
        lists.forEach((list) => {
          list.dataset.choose = 'neutrality'
        })
        e.target.dataset.choose = 'true'
      })
    })
  }
  // 色块变化
  _blockChangingColor() {
    const items = this._parentElement.querySelectorAll(
      '.header-eject--tab2 .item'
    )
    // 变色方块
    items.forEach((val) => {
      val.addEventListener('mouseenter', function (e) {
        items.forEach((item) => {
          item.dataset.choose = 'false'
        })
        e.target.dataset.choose = 'true'
      })
    })
  }
  // 添加事件，文章渲染
  _articleListRendering() {
    const lists = this._parentElement.querySelectorAll(
      '.header-eject--tab2-nav .item'
    )
    const article = this._parentElement.querySelector(
      '.header-eject--tab2-lists .items'
    )
    lists.forEach((val) => {
      val.addEventListener('mouseenter', () => {
        const id = val.dataset.id
        const data = this._data.data.find((value) => value.id == id)
        const str = data.article
          .map((val) => {
            return `
           <li>
             <a class="item" data-choose="false" href='javascript:void(0);' onclick='linkTo("${val.href}")'>
               <h6 class="title">${val.title}</h6>
               <p class="text">
                 ${val.brief}
               </p>
             </a>
           </li>`
          })
          .join(' ')
        article.innerHTML = str
        this._blockChangingColor()
      })
    })
  }
}

export default new NavDropDownContent()
