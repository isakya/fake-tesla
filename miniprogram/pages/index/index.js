// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    currentSwiperIndex: 0
  },

  onSwiperChange(e) {
    const { current } = e.detail
    this.setData({
      currentSwiperIndex: current
    })
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 拿到数据库
    this.db = wx.cloud.database()
    this._loadSwiper()
  },

  gotoProduct(e) {
    if(e.currentTarget.dataset === null) {
      return
    }
    const {productId} = e.currentTarget.dataset

    wx.navigateTo({
      url: `/pages/product/index?id=${productId}`
    })
  },

  // 获取轮播图
  _loadSwiper() {
    // 
    this.db.collection('swiper').get().then(res => {
      res.data.forEach((item1, index1) => {
        item1.config.forEach((item2, index2) => {
          let splitItems = item2.split("|")
          item1.config[index2] = {
            title: splitItems[0], 
            subtitle: splitItems[1]
          }
        })
        res.data[index1] = item1
      })
      console.log(res.data)
      this.setData ({
        swiperList: res.data
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