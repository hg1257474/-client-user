// pages/chat/page.js
const {
  chatUrl
} = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      src: `${chatUrl}?${encodeURIComponent(`sessionId=${wx.getStorageSync('sessionId').value}@chatId=${options.chatId}@formId=${options.formId}`)}`
    })

  },
})