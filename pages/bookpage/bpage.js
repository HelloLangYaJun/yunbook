import { fetch} from '../../utils/util.js'
Page({

  data: {
     content:{}
  },
  onLoad: function (options) {
    this.getContent(options.id)
    
  },
  getContent(id) {
    fetch.get(`/article/${id}`).then((res) => {
      this.setData({
        content: res
      })
      console.log(this.data.content)
    })
  },
  onShareAppMessage: function () {
  
  }
})