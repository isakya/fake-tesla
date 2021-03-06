// components/tesla-swiper/index.js
Component({
  /**
   * 组件的属性列表
   */
  // 相当于vue 的 prop
  properties: {
    data: {
      type: Array,
      default: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      const { current } = e.detail
      this.setData({
        current
      })
    },
    gotoProduct(e) {
      if(e.currentTarget.dataset === null) {
        return
      }
      const {productId} = e.currentTarget.dataset
      console.log(productId)
      wx.navigateTo({
        url: `/pages/product/index?id=${productId}`
      })
    },
    onBookBtnClick() {
      // 把on-book-btn-click事件传递出去 给父组件
      this.triggerEvent('on-book-btn-click')
    }
  },
})
