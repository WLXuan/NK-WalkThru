Page({
  onLoad: function (options) {
    this.getHotList()
  },
  getHotList() {
    wx.cloud.database().collection('dish').orderBy("sales", 'desc').get().then(res => {
      console.log("dish", res)
      this.setData({
        hotList: res.data
      })
    })
  },

})