// pages/service/service.js
const io = require("../../utils/weapp.socket.io.js")
const {
  serviceUrl
} = require("../../config/app.js")
let socket = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    services: []
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this
    const {
      services
    } = this.data
    socket = io(serviceUrl, {
      query: {
        sessionId: wx.getStorageSync("sessionId")
      }
    })
    socket.emit("pull", "initialization", () => {
      socket.on("push", (_services, cb) => {
        console.log(_services)
        if (_services[0] instanceof Array) that.setData({
          services: [..._services, ...that.data.services]
        })
        else {
          let index = that.data.services.findIndex(item => item[2] === _services[2])
          if (index !== -1) that.data.services.splice(index, 1)
          that.data.services.unshift(_services)
          that.setData({
            services: that.data.services
          })
        }
        if (cb) cb()
      })
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onSubmit(e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/chat/chat?chatId=${e.detail.target.id}&formId=${e.detail.formId}`
    })
    console.log(e.detail)
  },
})