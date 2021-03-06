//app.js
const Towxml = require('/towxml/main');
App({
  onLaunch: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          let appid = `wx370726c71415fee6`
          let secret = `884f1d45428f32e8720abdb4e69e8cf9`
          wx.request({
            url: 'https://m.yaojunrong.com/login',
            method:"POST",
            data: {
              code: res.code,
              appid,
              secret,
            },
            success: function (res) {
              wx.setStorageSync('token', res.header.Token || res.header.token )
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
  globalData: {
    userInfo: null
  },
  towxml: new Towxml()        
})