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
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    city: 0,
    province: 0,
    currentProductId: null,
    provincesAndCitiesTree: [],
    cities: [],
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
    provincesAndCitiesTree.forEach((item, index) => {
      if (item.fullname === province) {
        currentProvinceIndex = index
      }
    })

    let currentCityIndex = 0
    cities.forEach((item, index) => {
      if (item.fullname === city) {
        currentCityIndex = index
      }
    })

    this.setData({
      city,
      province,
      currentProvinceIndex,
      currentCityIndex,
      cities: currentProvinceAndCities[0].children,
      provincesAndCitiesTree,
      currentProductId: options.id
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

  onSubmit() {
    if (this._isFormReady()) {
      this._handleSubmit()
    }
  },

  _handleSubmit() {
    wx.showLoading({
      title: '正在提交'
    })
    const {
      firstName,
      lastName,
      email,
      phone,
      province,
      city
    } = this.data
    const data = {
      firstName,
      lastName,
      email,
      phone,
      province,
      city,
      status: 'TO_DO',
      product: this.data.currentProductId
    }
    const db = wx.cloud.database()
    db.collection('test_drive').add({
      data
    }).then(res => {
      wx.hideLoading()
      this._showSuccess()
    })
  },
  _showSuccess() {
    wx.showModal({
      title: '预约成功',
      content: '感谢您提交Tesla试驾请求，我们的工作人员会及时跟您电话联系',
      showCancel: false,
      success () {
        wx.navigateBack({
          // 回到前一页，需要从前一页跳转到当前页才有效
          delta: 0
        })
      }
    })
  },
  _isFormReady() {
    // 拿到所有子组件
    const children = this.selectAllComponents('.tesla-input')
    let count = 0
    children.forEach(item => {
      if (item.isReady()) {
        count++
      }
    })
    return count === children.length
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