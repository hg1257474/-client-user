// pages/register/register.js
const {
  accountUrl
} = require("../../utils/config.js")
Page({
  data: {},
  onLoad: function(options) {
    console.log(options)
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
            nickname: res.userInfo.nickName,
            openId: that.data.openId
          },
          success(res) {
            getApp().globalData.callbacks[this.data.id]()
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  },
  onGetUserInfo(e) {
    wx.request({
      url: accountUrl.update,
      method: "POST",
      data: {
        nickname: e.detail.userInfo.nickName,
        avatar: e.detail.userInfo.avatarUrl,
        openId: this.data.openId
      },
      success: function(res) {
        getApp().globalData.callbacks[this.data.id]()
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})