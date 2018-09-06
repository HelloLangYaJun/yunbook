import {
  fetch,
  transformtime
} from '../../utils/util.js'
Page({
  data: {
    books: [],

  },
  onLoad: function(options){
    this.getReadInfo()
  },
  getReadInfo() {
    fetch.get(`/readList`).then((res) => {
      res.data.forEach(item => {
        item.updatedTime = transformtime(item.updatedTime)
        item.bai = Math.floor((item.title.index + 1) / (item.title.total + 1) * 100)
      })
      this.setData({
        books: res.data
      })
      console.log(this.data.books)
    })

  },
  // 得到上次查看时间
  getTime() {

  },
  //查看文档
  goDetail(event) {
    wx.navigateTo({
      url: `/pages/Details/details?id=${event.target.id}`,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 继续查看
  goBookPage(event){
    wx.navigateTo({
      url: `/pages/bookpage/bpage?id=${event.target.id}&&qureyid=${event.currentTarget.dataset.postId}`,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 获取目录数量
  getdir(){
    // 获取目录
    fetch.get(`/titles/${this.data.queryid}`).then((res) => {
      this.setData({
        dir: res
      })
      this.getnewcontent()
    })
  },
  onShareAppMessage: function() {

  },
  onShow(){
    this.getReadInfo()
  }
  
})