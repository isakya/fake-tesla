// pages/test-drive/index.js
import {
  getCurrentLocation,
  getProvincesAndCitiesTree
} from '../../utils/location'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentProduct: null,
    provincesAndCitiesTree: [],
    cities: [],
    city: 0,
    province: 0,
    currentProvinceIndex: 0,
    currentCityIndex: 0
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
    this.db.collection('product').where({
      '_id': options.id
    }).get().then(res => {
      this.setData({
        currentProduct: res.data[0]
      })
    })
    const {
      city,
      province
    } = getCurrentLocation()

    const provincesAndCitiesTree = getProvincesAndCitiesTree()

    const currentProvinceAndCities = provincesAndCitiesTree.filter(item => {
      return item.fullname === province
    })

    const cities = currentProvinceAndCities[0].children
    let currentProvinceIndex = 0
    provincesAndCitiesTree.forEach((item,index) =>{
      if(item.fullname === province ) {
        currentProvinceIndex = index
      }
    })

    let currentCityIndex = 0
    cities.forEach((item,index) =>{
      if(item.fullname === city ) {
        currentCityIndex = index
      }
    })

    this.setData({
      city,
      province,
      currentProvinceIndex,
      currentCityIndex,
      cities: currentProvinceAndCities[0].children,
      provincesAndCitiesTree
    })
  },

  bindProvinceChange: function (e) {
    const index = e.detail.value
    this.setData({
      province: this.data.provincesAndCitiesTree[index].fullname,
      city: this.data.provincesAndCitiesTree[index].children[0].fullname,
      cities: this.data.provincesAndCitiesTree[index].children,
      currentProvinceIndex: index,
      currentCityIndex: 0
    })
  },

  bindCityChange: function (e) {
    const index = e.detail.value
    this.setData({
      city: this.data.cities[index].fullname,
      currentCityIndex: index
    })
  },

  onInput(e) {
    if (e.detail.value == '') {
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