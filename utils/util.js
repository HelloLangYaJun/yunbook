const baseUrl='https://m.yaojunrong.com'
const fetch={
  get(url, method = "GET", data = "", header = { 'content-type': 'application/json'}){
    return new Promise((resolvd,reject)=>{
      let token = wx.getStorageSync('token') 
      if (token) {
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        method,
        data, 
        header,
        success(res) {
          if (res.header.Token || res.header.token) {
            wx.setStorageSync("token", res.header.Token || res.header.token)
          }
          resolvd(res.data)
        },
        fail(err){
          reject(err)
        }
      })
    })
  }
}

// -----------------------------
const transformtime=function(t){
  var date = new Date(t);
  var updatetime = date.getTime();
  let time = new Date().getTime() - updatetime
  let arr = []
  let str = 999;
  let str2 = "刚刚"
  arr.push(Math.floor(time / (1000 * 3600 * 24 * 365)))
  arr.push(Math.floor(time / (1000 * 3600 * 24 * 30)))
  arr.push(Math.floor(time / (1000 * 3600 * 24)))
  arr.push(Math.floor(time / (1000 * 3600)))
  arr.push(Math.floor(time / (1000 * 60)))
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      str = i;
      switch (i) {
        case 0:
          str2 = "年"
          break
        case 1:
          str2 = "月"
          break
        case 2:
          str2 = "天"
          break
        case 3:
          str2 = "小时"
          break
        case 4:
          str2 = "分钟"
          break
        default:
          str2 = "刚刚"
          break
      }
      break
    }
  }
  if(str==999){
    return str2 
  }
  return arr[str] + str2 + "前"
}
export { fetch, transformtime}

