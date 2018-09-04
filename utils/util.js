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
export {fetch}
