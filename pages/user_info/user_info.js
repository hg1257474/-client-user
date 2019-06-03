// pages/user_info/user_info.js
const {
  accountUrl
} = require("../../config/app.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    needInvoice: false,
    city: [],
    showCity: '请选择'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(wx.getStorageSync("sessionId"))
    const that = this
    wx.request({
      url: accountUrl.getInfo + "?sessionId=" + wx.getStorageSync("sessionId"),
      data: wx.getStorageSync("sessionId"),
      success: (res) => {
       console.log(res)
          res.data.showCity=res.data.city.reduce((pr, cu) => pr === cu ? cu : `${pr}.${cu}`)
        that.setData(res.data)

      }
    })
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

  onSubmit: function(e) {
    wx.request({
      url: accountUrl.updateInfo,
      method:"POST",
      data:{
        sessionId:wx.getStorageSync("sessionId"),
        ...e.detail.value
      },
      success: (res) => {
        // console.log(res),
        // that.setData(res.data)

      }
    })
  },
  onCityChange: function({
    detail: {
      value
    }
  }) {
    console.log(value)
    this.setData({
      city: value,
      showCity: value.reduce((pr, cu) => pr === cu ? cu : `${pr}.${cu}`)
    })
  },
  onSwitchChange: function() {
    this.setData({
      needInvoice: !this.data.needInvoice
    })
  }
})