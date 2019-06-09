// pages/service/service.js
const io = require("../../utils/weapp.socket.io.js")
const {
  serviceUrl
} = require("../../utils/config.js")
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
    wx.request({
      url: serviceUrl,
      method: "post",
      success(res) {
        const {
          services
        } = that.data
        socket = io(serviceUrl, {
          query: {
            sessionId: res.data
          }
        })
        socket.emit("pull", "initialization", (initiallyServices) => {
          that.setData({
            services: initiallyServices
          })
          socket.on("push", (service, cb) => {
            let index = that.data.services.findIndex(item => item[2] === service[2])
            if (index !== -1) that.data.services.splice(index, 1)
            that.data.services.unshift(service)
            that.setData({
              services: that.data.services
            })
            if (cb) cb()
          })
        })
      }
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

// will implement batch pull in the future