// pages/product/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: null,
    productLines: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.db = wx.cloud.database()
    this.db.collection('product').doc(options.id).get().then(res => {
      this.setData({
        product: res.data
      })
      console.log(res.data)
      this._loadProductLine(res.data.product_lines)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  _loadProductLine(productLines) {
    let ids = []
    productLines.forEach(item => {
      ids.push(item)
    })
    this.db.collection('product_line').where({
      _id: this.db.command.in(ids)
    }).get().then(res => {
      this.setData({
        productLines: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})