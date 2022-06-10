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
    rules: {
      type: Array,
      value: []
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
    isError: false,
    errorMessage: ''
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onInput(e) {
      this.checkError()
    },
    checkError() {
      this._handleRequired()
      this._handleRules()
    },
    _handleRequired() {
      let isError = false
      let errorMessage = ''
      if (this.properties.required) {
        if (this.properties.value === '') {
          isError = true
          errorMessage = `请输入${ this.properties.label ? this.properties.label : '字段' }`
        }
      }
      this.setData({
        isError,
        errorMessage
      })
    },
    _handleRules() {
      this.properties.rules.forEach(rule => {
        this._handleRule(rule)
      })
    },
    _handleRule(rule) {
      switch (rule.type) {
        case 'email':
          this._handleEmailCheck()
          break
        case 'phone':
          this._handlePhoneCheck()
          break
      }
    },
    _handleEmailCheck() {
      let reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      if (!reg.test(this.properties.value)) {
        this.setData({
          isError: true,
          errorMessage: '请输入正确的电子邮件'
        })
      }
    },
    _handlePhoneCheck() {
      let reg = /^((13\d)|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0,1,3,5,7,8])|(18[0-9])|(19[8,9]))\d{8}/;
      if (!reg.test(this.properties.value)) {
        this.setData({
          isError: true,
          errorMessage: '请输入正确的手机号码'
        })
      }
    },
    isReady() {
      this.checkError()
      return !this.data.isError
    }
  }
})