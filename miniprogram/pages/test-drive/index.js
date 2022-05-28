// pages/test-drive/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentProduct: null,
    provinces: ['浙江', '山西', '广东', '新疆', '江苏'],
    cities: ['杭州', '西安', '广州', '乌鲁木齐', '南京'],
    city: 0,
    province: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 更改头部title
    wx.setNavigationBarTitle({
      title: '预约试乘试驾',
    })
    wx.setBackgroundColor({
      backgroundColor: '#f7f7f7',
    })
    this.db = wx.cloud.database()
    this.db.collection('product').where({'_id': options.id}).get().then(res => {
      this.setData({
        currentProduct: res.data[0]
      })
    })
  },

  bindProvinceChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      province: e.detail.value
    })
  },

  bindCityChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      city: e.detail.value
    })
  },

  onInput(e) {
    if(e.detail.value == '') {
      console.log('error', '必填字段')
    }
    console.log(e.detail.value)
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