import { fetch} from '../../utils/util.js'
const app = getApp()
Page({
  data: {
     content:{},
     article: {},
     isLoading: true,
     isLoading2:false,
     isDir:false,
     dir:{},
    //  是否显示悬浮按钮
     isflexbutton:false,
    //  按钮的活动状态
    button:"none",
    options:''
  },
  onLoad: function (options) {
    this.setData({
      options: options
    })
    // 获取目录
    this.getcontent(options)
    fetch.get(`/titles/${options.qureyid}`).then((res) => {
      this.setData({
        dir: res
      })
    })
  },
  getcontent(options){
    const _ts = this;
    wx.request({
      url: `https://m.yaojunrong.com/article/${options.id}`,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        //将markdown内容转换为towxml数据
        let data = app.towxml.toJson(res.data.data.article.content, 'markdown');
        // 设置文档显示主题，默认'light'
        data.theme = 'dark';
        //设置数据
        _ts.setData({
          article: data,
          isLoading: false,
        });
      }
    });
  },
  // getContent(id) {
  //   fetch.get(`/article/${id}`).then((res) => {
  //     this.setData({
  //       content: res
  //     })
  //     console.log(this.data.content)
  //   })
  // },
  opendir(event){
    this.setData({
      isDir: !this.data.isDir,
    })
  },
  openflex(event) {
    if (this.data.isDir){
      this.setData({
        isDir: !this.data.isDir,
      })
    }
    else{
      this.setData({
        isflexbutton: !this.data.isflexbutton,
      })
    } 
  },
  // 返回上一级页面
  back(){
    wx.navigateBack({
      delta: 1
    })
  },
  // 刷新页面
  onShow: function () {
    this.setData({
        isLoading: true,
    })
   this.getcontent(this.data.options)
  },
  // 获取屏幕亮度
  getlight(errMsg){
    wx.getScreenBrightness({
      success: function (res) {
        
      }
    })
    wx.setScreenBrightness({
      value: 1,
      success:function(){
        console.log('ok')
      }
    })
  },
  onShareAppMessage: function () {
  }
})