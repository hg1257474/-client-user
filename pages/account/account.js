// pages/register/register.js
const {
  accountUrl
} = require("../../utils/config.js")
const callback = (res) => {
  const sessionId = {
    value: res.cookies[0].match(/EGG_SESS([^;]+);/)[1],
    expires: res.cookies[0].match(/expires([^;]+);/)[1],
    raw: res.cookies[0].split(" ")[0]
  }
  wx.setStorageSync("sessionId", sessionId)
  wx.setStorageSync("user", {})
  wx.switchTab({
    url: '/pages/index/index',
  })
}
Page({
  data: {
    shouldAuthorization: false
  },
  onLoad: function(options) {
    let sessionId = wx.getStorageSync("sessionId") ? wx.getStorageSync("sessionId").raw : ""
    wx.login({
      success(res) {
        console.log(res.code)
        console.log(sessionId)
        wx.request({
          url: `${accountUrl}?code=${res.code}`,
          method: "HEAD",
          header:{cookie:"count=dasdasdsadsa;"},
          success(res) {
            console.log(res)
            if (res.statusCode === 401) {
              this.setData({
                openId: res.cookies[0].match(/openId=([^;]+);/)[1]
              })
              this.getUserInfo()
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
          url: accountUrl.update,
          method: "POST",
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
      url: accountUrl.update,
      method: "POST",
      data: {
        nickname: e.detail.userInfo.nickName,
        avatar: e.detail.userInfo.avatarUrl,
        openId: this.data.openId
      },
      success: callback
    })
  }
})