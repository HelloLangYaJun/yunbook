import {
  fetch,
  transformtime
} from '../../utils/util.js'
const app = getApp()
Page({
  data: {
    // 个人信息凭证
    token: '',
    queryid: 1,
    book: {},
    dir: {},
    isLoading: true,
    isDir: false,
    // 最新章节内容
    newcontent: {},
    // 收藏状态
    isEnshrine: false,
  },
  onLoad: function(options) {
    //------ 获取个人信息凭证---------
    let token = wx.getStorageSync('token')
    //------ 获取个人信息凭证---------

    this.setData({
      queryid: options.id,
      token,
    })
    this.getData()
    this.getEnshrine()
  },
  onShareAppMessage: function(res) {
    return {
      title: '非学小程序',
      path: 'pages/index/index'
    }
  },
  getEnshrine() {
    fetch.get(`/collection?pn=1&size=10`).then((res) => {
      console.log(res)
      res.data.forEach(item => {
        if (item.book._id == this.data.queryid) {
          this.setData({
            isEnshrine: true,
          })
        }   
      })

    })
  },
  // 获取书籍详情
  getData() {
    fetch.get(`/book/${this.data.queryid}`).then((res) => {
      res.data.updateTime = transformtime(res.data.updateTime)
      this.setData({
        isLoading: false,
        book: res
      })
    })
    // ---------分割线----------
    // 获取目录
    fetch.get(`/titles/${this.data.queryid}`).then((res) => {
      this.setData({
        dir: res
      })
      this.getnewcontent()
    })
  },
  // ----------打开目录--------
  opendir() {
    this.setData({
      isDir: true
    })
  },
  closedir() {
    this.setData({
      isDir: false
    })
  },
  // ----------获取最新章节内容--------
  getnewcontent() {
    let dirconten = this.data.dir.data
    // console.log(dirconten)
    wx.request({
      url: `https://m.yaojunrong.com/article/${dirconten[dirconten.length - 1]._id}`,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {

        //将markdown内容转换为towxml数据
        let data = app.towxml.toJson(res.data.data.article.content.slice(0, 250), 'markdown');
        // 设置文档显示主题，默认'light'
        data.theme = 'light';
        data.child
        //设置数据
        this.setData({
          newcontent: data
        });
      }
    });
    // ----------------
    //  fetch.get(`/article/${dirconten[dirconten.length-1]._id}`).then((res) => {
    //    console.log(res)
    //    let data = app.towxml.toJson(res.data.article.content, 'markdown');
    //    data.theme = 'dark';
    //    console.log(data)
    //    this.setData({
    //      newcontent: data
    //    }) 
    //  })
  },
  // ---------跳转到章节查看页面---------
  nvtoBpage(event) {
    let dirconten = this.data.dir.data
    let url = ''
    if (event.target.id == "one") {
      url = `/pages/bookpage/bpage?id=${dirconten[0]._id}&&qureyid=${this.data.queryid}`
    } else {
      url = `/pages/bookpage/bpage?id=${event.target.id}&&qureyid=${this.data.queryid}`
    }
    this.setData({
      isDir: false
    })
    wx.navigateTo({
      url: url,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // -----------------------收藏----------------------------
  enshrine() {
    if (this.data.isEnshrine) {
      fetch.get(`/collection/delete`, "POST", {
        arr: [this.data.queryid]
      }).then((res) => {
        console.log(res)
        this.setData({
          isEnshrine: false,
        })
      })
    } else {
      fetch.get(`/collection`, "POST", {
        bookId: this.data.queryid
      }).then((res) => {
        console.log(res)
        this.getEnshrine()
      })
    }
  }
})