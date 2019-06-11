// pages/user/user.js
const {
  customerUrl
} = require("../../utils/config.js")
//const vips = ["普通", "月度", "年度"]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shouldShowInput:false,
    franchiseModes: ['纯直营', '开放他人加盟', '加盟他人'],
    vip: {
      src: "/images/user/vip_normal.png",
      type: "普通会员"
    }
  },
  onReady: function() {
    const initialization = () => {
      console.log(wx.getStorageSync("customer"))
      const vip = wx.getStorageSync("customer").vip
      this.setData({
        src: `../../images/user/vip${vip ? "" : "_normal"}.png`,
        type: vip.kind+"会员"
      })
    }
    initialization()
  },

  onChoose(e) {
    console.log(e)
    this.setData({
      "info.franchiseMode": e.detail
    })
  },
  updateInfo() {
    let info = wx.getStorageSync("customer").info
    if (info) {
      this.setData({
        shouldShowInput: true,
        info
      })
      return
    }
    const that = this
    wx.request({
      url: customerUrl,
      header: {
        cookie: wx.getStorageSync("sessionId").raw
      },
      method: "GET",
      success(res) {
        info = res.data
        const customer = wx.getStorageSync("customer")
        customer.info = info
        wx.setStorageSync("customer", customer)
        that.setData({
          shouldShowInput: true,
          info
        })
      }
    })
  },
  onSubmit(e) {
    console.log(e)
    const that = this
    const info = e.detail.value
    info.franchiseMode = this.data.info.franchiseMode
    wx.request({
      url: customerUrl,
      method: "PUT",
      data: info,
      header:{cookie:wx.getStorageSync("sessionId").raw},
      success(res) {
        console.log(res)
        const customer = wx.getStorageSync("customer")
        customer.info = info
        customer.isAllInfo=res.data
        wx.setStorageSync("customer", customer)
        that.setData({
          info,
          shouldShowInput: false
        })
      }
    })
  }
})