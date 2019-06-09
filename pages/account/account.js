// pages/register/register.js
const {
  loginUrl,
  accountUrl
} = require("../../utils/config.js")
const callback = (res) => {
  console.log(res)
  const sessionId = {
    value:res.cookies[0].split(";")[0],
    raw:res.cookies[1].split(";")[0]
  }
  wx.setStorageSync("sessionId", sessionId)
  wx.setStorageSync("customer", {})
  wx.switchTab({
    url: '/pages/index/index',
  })
}
Page({
  data: {
    shouldAuthorization: false
  },
  onLoad: function(options) {
    const that = this
    let sessionId = wx.getStorageSync("sessionId")&&wx.getStorageSync("sessionId").raw
    wx.login({
      success: function(res) {
        wx.request({
          url: loginUrl,
          method: "POST",
          header: {
            cookie: sessionId
          },
          data: {
            jsCode: res.code
          },
          success: function(res) {
            console.log(res)
            if (res.statusCode === 202) {
              that.setData({
                  openId: res.data
                }, () =>
                that.getUserInfo()
              )
            } else if (res.statusCode === 201) callback(res)
            else wx.switchTab({
              url: '/pages/index/index',
            })
          }
        })
      }
    })
  },
  getUserInfo() {
    const that = this
    wx.getUserInfo({
      success(res) {
        wx.request({
          url: accountUrl,
          method: "PUT",
          data: {
            avatar: res.userInfo.avatarUrl,
            nickname: res.userInfo.nickName,
            openId: that.data.openId
          },
          success: callback
        })
      },
      fail() {
        that.setData({
          shouldAuthorization: true
        })
      }
    })
  },
  onGetUserInfo(e) {
    wx.request({
      url: accountUrl,
      method: "PUT",
      data: {
        nickname: e.detail.userInfo.nickName,
        avatar: e.detail.userInfo.avatarUrl,
        openId: this.data.openId
      },
      success: callback
    })
  }
})