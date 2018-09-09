// pages/Allbook/allbook.js
import {
  fetch,
  transformtime
} from '../../utils/util.js'
Page({
  data: {
    title:'',
    books:[],
    pn:1,
  },
  onLoad: function (options) {
    this.setData({
      title: options.postId
    })
     this.getBook(options)
  },
  getBook(options){
    fetch.get(`/category/${options.id}/books?pn=${this.data.pn}&size=10`).then((res) =>{
        if(res.data.books.length==0){
        }
        else{
          res.data.books.forEach(item=>{
            item.updateTime = transformtime(item.updateTime)
          })
          let newbooks = [...this.data.books, ...res.data.books]
          this.setData({
            books: newbooks,
            pn:this.data.pn+1
          })
          return  this.getBook(options)
        }
       
    })
  },
  swiperNavigation(event){
    wx.navigateTo({
      url: `/pages/Details/details?id=${event.currentTarget.id}`,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onReachBottom: function () {
  
  },
})