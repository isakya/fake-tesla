// pages/magazine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pages: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    const db = wx.cloud.database()
    db.collection('magezine').where({_id: id}).get().then(res => {
      // 设置顶部标题
      wx.setNavigationBarTitle({
        title: res.data[0].title
      })
      this.setData({
        pages: res.data[0].pages
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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