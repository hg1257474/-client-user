// pages/user/user.js
const {
  getUser
} = require("../..//utils/account.js")
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
    getUser("vip").then((vip) => {
      this.setData({
        src: `../../images/user/vip${vip ? "" : "_normal"}.png`,
        type: vip ? vip.type : "普通会员"
      })
    })
  }
})