import * as models from './model'
// import Home from './route/home.js'
// import Series from './route/series.js'
// import Date from './route/date.js'
// import Article from './route/article.js'
// import Home from './route/home.js'
class Router {
  constructor(config) {
    this.routes = {} //保存注册的所有路由
    this.beforeFun = null //切换前需要执行的函数
    this.afterFun = null // 切换后需要执行的函数
    this.routerViewId = config ? config.routerViewId : 'routerView' // 路由挂载点
    this.redirectRoute = undefined // 路由重定向的 hash
    this.stackPages = true // 多级页面缓存
    // this.routerMap = [] // 路由遍历
    this.historyFlag = undefined // 路由状态，前进，回退，刷新
    this.history = [] // 路由历史

    this.map(config.routes)

    // 初始化跳转方法
    window.linkTo = (path) => {
      if (path.indexOf('?') !== -1) {
        window.location.hash = path + '&key=' + this.genKey()
      } else {
        window.location.hash = path + '?key=' + this.genKey()
      }
    }

    //页面首次加载 匹配路由
    window.addEventListener(
      'load',
      () => {
        this.historyChange()
      },
      false
    )

    //路由切换
    window.addEventListener(
      'hashchange',
      () => {
        this.historyChange()
      },
      false
    )
  }
  // 路由历史变化
  historyChange() {
    // 获取当前path
    const currentHash = this.getParamsUrl()
    const nameStr = 'router-' + this.routerViewId + '-history'
    // 检测本地储存是否留有记录
    this.history = window.sessionStorage[nameStr]
      ? JSON.parse(window.sessionStorage[nameStr])
      : []
    let back = false,
      refresh = false,
      index = 0,
      len = this.history.length

    for (let i = 0; i < len; i++) {
      let h = this.history[i]
      if (h.hash === currentHash.path && h.key === currentHash.query.key) {
        index = i
        if (i === len - 1) {
          refresh = true
        } else {
          back = true
        }
        break
      }
    }
    if (back) {
      this.historyFlag = 'back'
      this.history.length = index + 1
    } else if (refresh) {
      this.historyFlag = 'refresh'
    } else {
      this.historyFlag = 'forward'
      let item = {
        key: currentHash.query.key,
        hash: currentHash.path,
        query: currentHash.query
      }
      this.history.push(item)
    }
    if (!this.stackPages) {
      this.historyFlag = 'forward'
    }
    window.sessionStorage[nameStr] = JSON.stringify(this.history)
    this.urlChange()
  }
  // 路由处理函数
  urlChange() {
    // 获取当前路由状态
    const currentHash = this.getParamsUrl()
    // 在路由记录中匹配是否有该路由的 回调函数
    if (this.routes[currentHash.path]) {
      // 判断是否有路由切换前要执行的函数
      if (this.beforeFun) {
        this.beforeFun()
      } else {
        // 如果没有要执行的函数，那就开始切换路由
        this.changeView(currentHash)
      }
    } else {
      //不存在的地址,重定向到默认页面，类似于重定向
      location.hash = this.redirectRoute
    }
  }
  // 切换页面函数
  changeView(currentHash) {
    // 前进和刷新都执行回调 与 初始滚动位置为 0
    // currentPage.scrollTop = 0
    if (this.historyFlag == 'forward' || this.historyFlag == 'refresh') {
      window.scrollTo(0, 0)
    }
    this.routes[currentHash.path].callback
      ? this.routes[currentHash.path].callback(currentHash)
      : null
  }
  getParamsUrl() {
    // http://www.aspxfans.com:8080#/name?boardID=5&ID=24618&page=1
    // ['#/name','boardID=5&ID=24618&page=1]
    const hashDeatail = location.hash.split('?')
    // '/name'
    const path = hashDeatail[0].split('#')[1]
    // ['boardID=5','ID=24618','page=1']
    const params = hashDeatail[1] ? hashDeatail[1].split('&') : []
    const query = {}
    for (let i = 0; i < params.length; i++) {
      const item = params[i].split('=')
      /* {
        boardID:5,
        ID:24618,
        page:1
      }*/
      query[item[0]] = item[1]
    }
    return {
      path,
      query,
      params
    }
  }
  // 生成不同的 key
  genKey() {
    let t = 'xxxxx'
    return t.replace(/[xy]/g, function (c) {
      let r = (Math.random() * 16) | 0
      let v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
  map(routerMap) {
    for (let i = 0; i < routerMap.length; i++) {
      const route = routerMap[i]
      if (route.name === 'redirect') {
        this.redirectRoute = route.path
      } else {
        this.redirectRoute = routerMap[0].path
      }
      const newPath = route.path
      const path = newPath.replace(/\s*/g, '')
      this.routes[path] = {
        callback: route.callback
      }
    }
  }
}

const config = {
  routerViewId: 'routerView', // 路由切换的挂载点 id
  stackPages: true, // 多级页面缓存
  routes: [
    {
      path: '/home',
      name: 'home',
      async callback() {
        await models.fetchHome()
        await import('./route/home.js').then(({ Home }) => {
          new Home()
        })
      }
    },
    {
      path: '/series',
      name: 'series',
      async callback(route) {
        await models.fetchSeries(route.query)
        await import('./route/series.js').then(({ Series }) => {
          new Series()
        })
      }
    },
    {
      path: '/date',
      name: 'date',
      async callback(route) {
        await models.fetchDate(route.query)
        await import('./route/date.js').then(({ Date }) => {
          new Date()
        })
      }
    },
    {
      path: '/article',
      name: 'article',
      async callback(route) {
        await models.fetchArt(route.query)
        await import('./route/article.js').then(({ Article }) => {
          new Article()
        })
      }
    }
  ]
}
new Router(config)
