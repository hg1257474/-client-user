// pages/chat/page.js
const {
  messages
} = require('./data.js');
const {
  chatUrl
} = require('../../config/app.js')
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
    try {
      const sessionId = wx.getStorageSync('sessionId')
      this.setData({
        src: `${chatUrl}?sessionId=${sessionId}&chatId=${options.chatId}&formId=${options.formId}`
      })
    } catch (e) {
      // Do something when catch error
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onImageTap: ({
    currentTarget: {
      data: {
        pSrc
      }
    }
  }) => wx.previewImage({
    urls: [pSrc],
  }),
  onDocumentTap: ({
    currentTarget: {
      data: {
        src
      }
    }
  }) => {
    wx.downloadFile({
      url: src,
      success: ({
        tempFilePath
      }) => wx.saveFile({
        tempFilePath

      })
    })
  },
  onMessage: function(...x) {
    cosnole.log("ddddddddddd")
    console.log(x)
  }

})