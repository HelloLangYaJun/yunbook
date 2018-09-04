import { fetch } from '../../utils/util.js'
Page({
  data: {
  queryid:1,
  book:{}
  },
  onLoad: function (options) {
    this.setData({
      queryid:options.id
    })
   this.getData()
  },
  onShareAppMessage: function () {
  
  },
  getData(){
    console.log(this.data.queryid)
     fetch.get(`/book/${this.data.queryid}`).then((res) => {
     this.setData({
       book:res
     })
    })
  }
})