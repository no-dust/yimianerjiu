//index.js
//获取应用实例
export function getLocation() {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        resolve(res);
      }
    })
  })
}
export function getAuth(scope, callback) {
  wx.getSetting({
    success: res => {
      // 如果已授权
      if (res.authSetting[scope]) {
        callback();
      } else {
        wx.authorize({
          scope,
          success: callback,
          fail: () => {
            wx.showModal({
              title: '亲爱的用户', //提示的标题,
              content: '同意我们的授权，让我们为你提供更加优质的服务', //提示的内容,
              showCancel: false, //是否显示取消按钮,
              confirmText: '去设置', //确定按钮的文字，默认为取消，最多 4 个字符,
              confirmColor: '#3CC51F',   //确定按钮的文字颜色
              success: res => {
                wx.openSetting()
              }
            })
          }
        })
      }
    }
  })
}
const app = getApp()

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    latitude: 40.040848,
    longitude: 116.300278,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '/image/1.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '/image/1.png'
    }]
  },
  onLoad: function () {
    console.log('地图定位！')
    var that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 1
        })
      }
    });
  }
,
  // 重新定位
  goCurrent() {
    getAuth('scope.userLocation', async () => {
      let location = await getLocation();
      wx.setStorageSync('location', location)
      this.location = location;
    })
  },
  // 去我的页面
  goMy() {
    wx.navigateTo({ url: '/pages/personal/personal' });
  },
  // 去添加面试页面
  goAdd() {
    wx.navigateTo({ url: '/pages/Addinterview/Addinterview' });
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    console.log(this.mapCtx.moveToLocation())
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  }
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
