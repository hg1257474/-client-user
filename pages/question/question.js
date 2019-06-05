// pages/question/question.js
const {
  questionUrl
} = require("../../utils/config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData(options)

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
  onSubmit(event) {
    console.log(event)
    const {
      question
    } = event.detail.value
    if (question.replace(/\s+/g, "") === "") wx.showToast({
      title: '问题内容不能为空',
      icon: "none"
    })
    else {
      const sessionId = wx.getStorageSync('sessionId')
      console.log(sessionId)
      var data={...this.data,question,sessionId}
      wx.request({
        url: questionUrl,
        data,
        method: "POST",
        success(res) {
          console.log(res)
          wx.navigateTo({
            url: `/pages/chat/chat?chatId=${res.data}&formId=${event.detail.formId}`
          })
        }
      })

    }
  }
})