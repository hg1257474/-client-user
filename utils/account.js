const {
  loginUrl
} = require("./config.js")
const checkSession = () => new Promise((resolve) => {
  console.log(wx.getStorageSync("sessionId"))
  let sessionId = wx.getStorageSync("sessionId")
  console.log(sessionId)
  if (!sessionId || sessionId.expire < new Date().getTime()) {
    wx.login({
      success(res) {
        wx.request({
          url: loginUrl,
          method: "POST",
          data: {
            username: "code",
            password: res.code
          },
          success(res) {
            console.log(res)
            console.log(res.cookies[0].match(/openId=([^;]+);/)[1])

            if (res.statusCode === 401) {
              const id = new Date().getTime()
              wx.navigateTo({
                url: `/pages/account/account?id=${id}&openId=${res.cookies[0].match(/openId=([^;]+);/)[1]}`
              })
              getApp().globalData.callbacks[id] = () => checkSession.then(resolve)
              return
            }
            const sessionId = {
              value: res.cookies[0].match(/EGG_SESS([^;]+);/)[1],
              expires: res.cookies[0].match(/expires([^;]+);/)[1],
              raw: res.cookies[0].split(" ")[0]
            }
            wx.setStorageSync("sessionId", sessionId)
            wx.setStorageSync("user", {})
            resolve()

          }
        })
      }
    })
  }
})
exports.getUser = (type) => new Promise((resolve, reject) => {
  checkSession().then(() => {
    const user = wx.getStorageSync("user")
    switch (type) {
      case "vip":
        if (user.vip) resolve(user.vip)
        else {
          wx.request({
            url: accountUrl + "/vip",
            header: {
              cookies: wx.getStorageSync("sessionId").raw
            },
            success(res) {
              user.vip = res.data;
              wx.setStorageSync("user", user)
              resolve(res.data)
            }
          })
        }
        break;
      case "info":
        if (user.info) resolve(user.info)
        else {
          wx.request({
            url: accountUrl + "/info",
            header: {
              cookies: wx.getStorageSync("sessionId").raw
            },
            success(res) {
              user.info = res.info;
              wx.setStorageSync("user", user)
              resolve(res.data)
            }
          })
        }
    }
  })
})