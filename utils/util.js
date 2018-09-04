const baseUrl='https://m.yaojunrong.com'
const fetch={
  get(url,data){
    console.log(baseUrl + url)
    return new Promise((resolvd,reject)=>{
      wx.request({
        url: baseUrl + url,
        methods: 'GET',
        data,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolvd(res.data)
        },
        fail(err){
          reject(err)
        }
      })
    })
  }
}
const transformtime=function(t){
  var date = new Date(t);
  var updatetime = date.getTime();
  let time = new Date().getTime() - updatetime
  let arr = []
  let str = 0;
  let str2 = "天"
  arr.push(Math.floor(time / (1000 * 3600 * 24 * 365)))
  arr.push(Math.floor(time / (1000 * 3600 * 24 * 30)))
  arr.push(Math.floor(time / (1000 * 3600 * 24)))
  arr.push(Math.floor(time / (1000 * 3600)))
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
        default:
          str2 = "刚刚"
          break
      }
      break
    }
  }
  return arr[str] + str2 + "前"
}
export { fetch, transformtime}
