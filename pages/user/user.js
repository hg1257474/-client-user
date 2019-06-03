// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vip: {
      src: "/images/user/vip_normal.png",
      type: "普通会员"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    /*
    const paySign = console.log(`appId=wxa3729a934847ddfb&nonceStr=dsdsdfdd1211&package=prepay_id=wx260841322659423ccf506bc33557194553&signType=MD5&timeStamp=123456&key=XGSmEG6ClVz6OcVKx2N0qTbC40x5iyAA`)
    wx.requestPayment({
      'timeStamp': '123456',
      'nonceStr': 'dsdsdfdd1211',
      'package': 'prepay_id=wx260841322659423ccf506bc33557194553',
      'signType': 'MD5',
      'paySign': 'D2925E0F4A5E3B2FBC89AEBFDD2A6429',
      'success': function(res) {
        console.log(res)
      },
      'fail': function(res) {},
      'complete': function(res) {}
    })
    */
    //wx.login({success:(x)=>console.log(x)})

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

  }
})