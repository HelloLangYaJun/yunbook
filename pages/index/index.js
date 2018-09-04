//index.js
//获取应用实例
import { fetch, transformtime} from '../../utils/util.js'
const app = getApp()
Page({
  data: {
    imgUrls: [

    ],
    bookContent: [],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    isLoading:true
  },
  //事件处理函数
  onLoad: function() {

    this.getData('/swiper')
    this.getContent('/category/books')
  },
  getData(url) {
    fetch.get(url).then((res) => {
      this.setData({
        isLoading:false,
        imgUrls: res
      })
    })
  },
  getContent(url) {
    // 更改时间为某某天前
    fetch.get(url).then((res) => {
      res.data.forEach((item) => {
        item.books.forEach((item2) => {
          item2.updateTime = transformtime(item2.updateTime)
        })
      })
      this.setData({
        bookContent: res.data
      })
      console.log(this.data.bookContent)
    })
  },

  swiperNavigation: function(event) {
    console.dir(this.data.bookContent)
    wx.navigateTo({
      url: `/pages/Details/details?id=${event.currentTarget.id}`,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getTime() {

  }
})