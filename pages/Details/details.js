import { fetch,transformtime } from '../../utils/util.js'
Page({
  data: {
  queryid:1,
  book:{},
  dir:{},
  isLoading: true,
  isDir:false,
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
     fetch.get(`/book/${this.data.queryid}`).then((res) => {
       res.data.updateTime= transformtime(res.data.updateTime)
       this.setData({
      isLoading:false,
       book:res
     })
    })
    // ---------分割线----------
    // 获取目录
    fetch.get(`/titles/${this.data.queryid}`).then((res) => {
      this.setData({
        dir: res
      })
      console.log(res)
    })
  },
  // ----------打开目录--------
  opendir() {
      this.setData({
        isDir:true
      })
  },
  closedir() {
    this.setData({
      isDir: false
    })
  },
  // ---------跳转到章节查看页面---------
  nvtoBpage(event){
    console.log(event)
     wx.navigateTo({
       url: `/pages/bookpage/bpage?id=${event.target.id}`,
       success: function(res) {},
       fail: function(res) {},
       complete: function(res) {},
     })
  }
})