// pages/service_info/service_info.js
const {
  serviceUrl
} = require("../../utils/config.js")
let serviceId = null
const raw = {
  service: {
    id: null,
    name: null,
    status: null
  },
  question: {
    text: null,
    files: []
  },
  custoemrContact: {
    name: null,
    method: null,
    info: null,
  },
  servicerContact: {
    name: null,
    method: null,
    info: null
  },
  chat: null,
  payment: {
    fee: null,
    status: null,
  }
}
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  onShow: function() {
    wx.request({
      url: serviceUrl + "/" + this.data.serviceId,
      success(res) {
        const raw = res.data
        raw.service.id = serviceId
        if (raw.payment) {
          if (raw.payment.hasPaid) raw.payment.url = "/pages/order_info/order_info?serviceId=" + serviceId
          else raw.payment.url = "/pages/pay/pay?shouldPayContract=true&serviceId=" + serviceId
        }
        if (raw.hasReview !== undefined) {
          raw.review = raw.hasReview ? "reviewed" : "noReviewed"
        }
        this.setData(raw)
      }
    })
  },
  onFilePreview(e) {
    console.log(e)
  },
  onFileDownload(e) {
    console.log(e)
  }
})