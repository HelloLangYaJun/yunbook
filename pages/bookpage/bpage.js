import { fetch} from '../../utils/util.js'
const app = getApp()
Page({
  data: {
     content:{},
     article: {},
     isLoading: true,
     isLoading2:false,
     isDir:false,
     isSetting:false,
     dir:{},
    //  是否显示悬浮按钮
     isflexbutton:false,
    //  按钮的活动状态
    button:"none",
    options:'',
    // 文章滚动位置
    topNum:0,
    // 屏幕高度
    windowHeight:0,
    // 全局字体大小
    size:100,
    screenlight:1,
  },
  onLoad: function (options) {
    this.setData({
      options: options
    })
    // 初始化屏幕亮度
     this.getlight()
    // 获取目录
    this.getcontent(options)
    fetch.get(`/titles/${options.qureyid}`).then((res) => {
      this.setData({
        dir: res
      })
      console.log(res)
    })
    this.getSystemInfo()
  },
   // 获取屏幕高度
  getSystemInfo() {
    var that=this
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        that.setData({
          windowHeight: calc
        });
      }
    });
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
          topNum:0,
          
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
  // 查看其他章节
  nvtoBpage(event){
    this.setData({
      isflexbutton: false,
      isDir: false,
      isLoading: true,
      isSetting: false
    })
    this.getcontent(event.target)
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
    var that=this
    wx.getScreenBrightness({
      success: function (res) {
        console.log(res)
        console.log(res.value)
        that.setData({
          screenlight:res.value
        })  
      }
    })
  },
  // 设置屏幕亮度
  setlight(event){
     let light=this.data.screenlight
    if (event.target.id == "up"){
      light+=0.1
    }
    else{
      light -= 0.1
      if(light<=-0.1){
        light=0
      }
    }
    this.setData({
      screenlight:light
    })
    console.log(light)
    wx.setScreenBrightness({
      value: light,
    })
  },
  // 显示设置界面
  getsetting(){
      this.setData({
        isSetting:!this.data.isSetting
      })
  },
  // 设置字体大小
  setsize(event){
    let newsize=this.data.size
    if(event.target.id=="up"){
      newsize+=10;
      if(newsize==210){
        newsize=200;
      }
      this.setData({
        size:newsize
      })
    }
    else{
      if (newsize == 40) {
        newsize = 50;
      }
      newsize -= 10;
      this.setData({
        size: newsize
      })
    }
  },
  scroll: function (e, res){
    console.log('ok')
  },
  onShareAppMessage: function () {
  }
})