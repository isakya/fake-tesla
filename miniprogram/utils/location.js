// 引入SDK核心类，js文件根据自己业务，位置可自行放置
const QQMapWX = require('../libs/qqmap-wx-jssdk.min.js');
// 实例化API核心类
let qqmapsdk = new QQMapWX({
  key: '5UMBZ-SHLRV-ZUKPY-UVQWC-2TSV5-N7BNJ'
})

export const initCurrentLocation = () => {
  qqmapsdk.reverseGeocoder({
    success(res) {
      // 放到缓存里面
      wx.setStorageSync('userCurrentLocation', res.result['ad_info'])
    }
  })
}
export const getCurrentLocation = () => {
  if (!wx.getStorageSync('userCurrentLocation')) {
    initCurrentLocation()
  }
  return wx.getStorageSync('userCurrentLocation')
}
export const initProvincesAndCities = () => {
  qqmapsdk.getCityList({
    success: function (res) { //成功后的回调
      wx.setStorageSync(
        "provinces",
        res.result[0]
      )
      wx.setStorageSync(
        "cities",
        res.result[1]
      )
      // console.log('省份数据：', res.result[0]); //打印省份数据
      // console.log('城市数据：', res.result[1]); //打印城市数据
      // console.log('区县数据：', res.result[2]); //打印区县数据
    }
  })
}



export const getProvincesAndCitiesTree = () => {
  let allCities = wx.getStorageSync('cities')
  let allCitiesGroupByProvince = []
  let index = 0
  let prevItem
  allCities.forEach(item => {
    if(allCitiesGroupByProvince.length === 0) {
      allCitiesGroupByProvince.push([item])
    } else {
      if(item.id.slice(0, 2) === prevItem.id.slice(0, 2)) {
        allCitiesGroupByProvince[index].push(item)
      } else {
        allCitiesGroupByProvince.push([item])
        index++
      }
    }
    prevItem = item
  })
  let provinces = wx.getStorageSync('provinces')
  let tree = []
  provinces.forEach((item, index) => {
    item['children'] = allCitiesGroupByProvince[index]
    tree.push(item)
  })
  return tree
}