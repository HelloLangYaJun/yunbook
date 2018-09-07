//index.js
//获取应用实例
import {
  fetch,
  transformtime
} from '../../utils/util.js'
const app = getApp()
Page({
  data: {
    imgUrls: [],
    bookContent: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    isLoading: true,
    pn: 1,
    // 底线
    isDone: false,
    isonReachBottom:true
  },
  //事件处理函数
  onLoad: function() {
    this.getData('/swiper')
    this.getContent('/category/books')
  },
  getData(url) {
    return new Promise((resolvd, reject) =>{
      fetch.get(url).then((res) => {
        this.setData({
          isLoading: false,
          imgUrls: res,
        })
        resolvd()
      })
    })
  },
  getContent(url) {
    return new Promise((resolvd, reject) => {
      fetch.get(url).then((res) => {
        res.data.forEach((item) => {
          item.books.forEach((item2) => {
            item2.updateTime = transformtime(item2.updateTime)
          })
        })
        this.setData({
          bookContent: res.data,
          idDone: false,
        })
      resolvd()
      })
    })
    // 更改时间为某某天前
   
  },
  // 轮播图跳转
  swiperNavigation: function(event){
    wx.navigateTo({
      url: `/pages/Details/details?id=${event.currentTarget.id}`,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getTime() {},
  // 下拉刷新
  onPullDownRefresh() {
    wx.setNavigationBarTitle({
      title: '刷新中……'
    })//动态设置当前页面的标题。
    this.setData({
      isLoading:true,
      isonReachBottom:true
    })
    wx.showNavigationBarLoading();
    this.getData('/swiper').then(
      this.getContent('/category/books').then(
        wx.hideNavigationBarLoading(),
        wx.stopPullDownRefresh(),
        wx.setNavigationBarTitle({
          title: '非学'
        }),//动态设置当前页面的标题。
         this.setData({
           pn:1
        })
      )
    )
  },
  // 上啦加载
  onReachBottom() {
    if (this.data.isonReachBottom){
      this.setData({
        pn: this.data.pn + 1
      })
      fetch.get(`/category/books?pn=${this.data.pn}&booksSize=2`).then((res) => {
        let newbookContent = [...this.data.bookContent, ...res.data]
        if (res.data.length == 0) {
          this.setData({
            isonReachBottom:false,
            isDone: true,
          })
        } else {
          res.data.forEach((item) => {
            item.books.forEach((item2) => {
              item2.updateTime = transformtime(item2.updateTime)
            })
          })
          this.setData({
            bookContent: newbookContent,
          })
        }
      })
    }
  },

  // ---------更多图书查看-----------
  more(event){
    console.log(event)
    wx.navigateTo({
      url: `/pages/Allbook/allbook?id=${event.currentTarget.id}&postId=${event.currentTarget.dataset.postId}`,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})