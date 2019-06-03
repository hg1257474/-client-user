// pages/pay/pay.js
const {
  communication,
  contract,
  fee
} = require('./other')
const {
  cacheUrl,
  payUrl
} = require('../../config/app.js')
const {
  myGetStorage
} = require('../../utils/storage.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shouldPayContract: undefined,
    totalFee: undefined,
    service: undefined,
    category: '0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    const that = this
    if (options.shouldPayContract) {
      wx.request({
        url: `${payUrl}`,
        method: "post",
        data: options,
        success(res) {
          console.log(res)
          that.setData({ ...options,
            ...res.data
          })
        }
      })
    }
  },
  onShow() {
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this
    const payPage = wx.getStorageSync("payPage") || {
      timestamp: null
    }
    wx.request({
      url: cacheUrl,
      data: {
        type: "payPage",
        timestamp: payPage.timestamp
      },
      success(res) {
        console.log(res)
        if (res.data) wx.setStorageSync("payPage", res.data)
        console.log(res.data, payPage)
        that.setData(wx.getStorageSync("payPage"))
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */

  onTap: function({
    currentTarget: {
      dataset: {
        id
      }
    }
  }) {
    this.setData({
      category: id
    })
  },
  onPay() {
    /*
    const url1 =`http://hbimg.huabanimg.com:80/3f6f64c36b07680ed325cc73e18523b33323cb3413f7f9-XQ2jOG_fw658`
    const url2 =`http://118.126.115.165:7001/chat/document?index=3&chatId=5cf1f3a777cf0b003bacf028`
    wx.previewImage({
      urls: [url2],
      current: url2,
      compelete(res){console.log(res)}
    })
    return
    */
    if (this.data.shouldPayContract) wx.requestPayment({
      ...this.data.param,
      success() {
        wx.navigateBack({
          delta: "1"
        })
      },
      fail(res) {
        console.log(res)
      }
    })
    else wx.request({
      url: `${payUrl}`,
      method: "post",
      data: {
        sessionId: wx.getStorageSync("sessionId"),
        category: this.data.category,
      },
      success(res) {
        console.log(res)
        wx.requestPayment({ ...res.data,
          success() {
            wx.navigateBack({
              delta: "1"
            })
          },
          fail(res) {
            console.log(res)
          }
        })

      }

    })
  }
})