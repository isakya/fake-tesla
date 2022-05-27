// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperItems: [
      {
        imageUrl: 'https://img0.baidu.com/it/u=512340543,3139277133&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
        title: 'Model S',
        config: [
          {title: '637', subtitle: '公里续航'},
          {title: '637', subtitle: '公里续航'},
          {title: '637', subtitle: '公里续航'}
        ]
      },
      {
        imageUrl: 'https://img0.baidu.com/it/u=512340543,3139277133&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
        title: 'Model Y',
        config: [
          {title: '637', subtitle: '公里续航'},
          {title: '637', subtitle: '公里续航'},
          {title: '637', subtitle: '公里续航'}
        ]
      },
      {
        imageUrl: 'https://img0.baidu.com/it/u=512340543,3139277133&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
        title: 'Model X',
        config: [
          {title: '637', subtitle: '公里续航'},
          {title: '627', subtitle: '公里续航'},
          {title: '617', subtitle: '公里续航'}
        ]
      },
    ],
    currentSwiperIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onSwiperChange(e) {
    const { current } = e.detail
    this.setData({
      currentSwiperIndex: current
    })
  },

  onLoad(options) {

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