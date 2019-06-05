//app.js
App({
  onLaunch(options) {
    /*
   console.log("nothiinddddddddddddddddddddddddddg")
   console.log(1133333333333333)
    let sessionId = wx.getStorageSync("sessionId")
    wx.login({
      success(res) {
        console.log(res)
        wx.request({
          url: accountUrl.login,
          method: "POST",
          data: {
            js_code: res.code,
            sessionId
          },
          success(res) {
            if (res.data == "already") return 1
            const {
              openId
            } = res.data
            if (!openId) wx.setStorageSync("sessionId", res.data)
            else wx.navigateTo({
              url: `/pages/account/account?openId=${openId}`
            })
          }
        })
      }
    })
*/
  },
  globalData: {
    callbacks:{},
    vip: false,
    info: {
      nickName: "张三"
    }
  }
})