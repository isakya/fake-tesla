// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    selectModelShow: false,
    products: null,
    magezine: {}
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 拿到数据库
    this.db = wx.cloud.database()
    this._loadSwiper()

    this.db.collection('product').get().then(res => {
      this.setData({
        products: res.data
      })
    })

    this.db.collection('magezine').get().then(res => {
      const magezine = res.data[0]
      this.setData({
        magezine
      })
    })
  },

  // 预约试驾
  onSwiperBookClick() {
    this.setData({
      selectModelShow: true
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
      this.setData({
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

  clickProduct(e) {
    const {
      id
    } = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/test-drive/index?id=${id}`
    })
    this.setData({
      selectModelShow: false
    })
  },
  clickMagazine(e) {
    const {
      id
    } = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/magazine/index?id=${id}`
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})