// pages/register/register.js
const {
  accountUrl
} = require("../../config/app.js")
Page({
  data: {},
  onLoad: function(options) {
    this.setData(options)
    this.getUserInfo()
  },
  getUserInfo() {
    const that = this
    wx.getUserInfo({
      success(res) {
        wx.request({
          url: accountUrl.update,
          method: "POST",
          data: {
            avatar: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName,
            openId: that.data.openId
          },
          success(res) {
            // console.log(res)
            wx.setStorageSync("sessionId", res.data)
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  },
  onGetUserInfo(e) {
    // console.log(e)
    wx.request({
      url: accountUrl.update,
      method: "POST",
      data: {
        nickName: e.detail.userInfo.nickName,
        avatar: e.detail.userInfo.avatarUrl,
        openId: this.data.openId
      },
      success: function(res) {
        wx.setStorageSync("sessionId", res.data)
        // getApp().globalData().isLogged = true
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})