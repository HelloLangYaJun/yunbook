// pages/Enshire/enshire.js
import {
  fetch,
  transformtime
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:[]
  },

  onLoad: function (options) {
     this.getEnshrine()
  },
  getEnshrine() {
    fetch.get(`/collection?pn=1&size=10`).then((res) => {
      console.log(res)
    this.setData({
      book:res.data
    })
    })
  },
  openbook(event){
    wx.navigateTo({
      url: `/pages/Details/details?id=${event.currentTarget.id}`,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onShow(){
    this.getEnshrine()
  },
  onShareAppMessage: function () {
  
  }
})