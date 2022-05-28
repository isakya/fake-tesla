// components/tesla-input/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    required: {
      type: Boolean,
      // value 等同于 vue 的 default
      value: false
    },
    label: {
      type: String,
      value: ''
    },
    value: {
      type: String | Number,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isError: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(e) {
      if(this.properties.required){
        let isError = false
        const { value } = e.detail
        if(value === '') {
          isError = true
        }
        this.setData({isError})
      }
    }
  }
})
