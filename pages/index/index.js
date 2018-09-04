//index.js
//获取应用实例
import {fetch} from '../../utils/util.js'
const app = getApp()
Page({
  data: {
    imgUrls: [

    ],
    bookContent: [],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  //事件处理函数
  onLoad: function() {
    this.getData('/swiper')
    this.getContent('/category/books')
  },
  getData(url) {
    fetch.get(url).then((res) => {
      console.log(res)
      this.setData({
        imgUrls: res
      })
    })
  },
  getContent(url) {
    fetch.get(url).then((res) => {
      this.setData({
        bookContent: res.data
      })
      console.log(res)
    })
  },

  swiperNavigation: function(event) {
    wx.navigateTo({
      url: `/pages/Details/details?id=${event.currentTarget.id}`,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})