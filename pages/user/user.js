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
  onReady: function() {
    const initialization = () => {
      const vip = wx.getStorageSync("user").vip
      this.setData({
        src: `../../images/user/vip${vip ? "" : "_normal"}.png`,
        type: vip ? vip.type : "普通会员"
      })
    }
    if (wx.getStorageSync("user").vip) initialization()
    else wx.request({
      url: customerUrl,
      success: function(res) {
        const user = wx.getStorageSync("user")
        user.vip = res.data
        wx.setStorageSync("user", user)
        initialization()
      }
    })
  },
  
  onChoose(t) {
    this.setData({"custome.mode":t})
  },
  onSubmit(){
    const that=this
    wx.request({
      url:customerUrl,
      method:"put",
      data:this.data.customer,
      success(){
        const user=wx.getStorageSync("user")
        user.customer=that.data.customer
        wx.setStorageSync("user",user)
      }
    })
  }
})