// pages/user/user.js
const {customerUrl}=require("../../utils/config.js")
const vips=["普通","月度","年度"]
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
      const vip = wx.getStorageSync("customer").vip
      this.setData({
        src: `../../images/user/vip${vip ? "" : "_normal"}.png`,
        type: vip ? vips[vip.kind] : "普通会员"
      })
    }
    if (wx.getStorageSync("customer").vip) initialization()
    else wx.request({
      url: customerUrl+"/vip",
      header:{cookie:wx.getStorageSync("sessionId").raw},
      success: function(res) {
        const customer = wx.getStorageSync("customer")
        customer.vip = res.data
        wx.setStorageSync("customer", customer)
        initialization()
      }
    })
  },
  
  onChoose(t) {
    this.setData({"custome.mode":t})
  },
  updateInfo(){
    this.setData({shouldShowInput:true})
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