Page({
  onLoad: function (options) {
    this.getHotList()
  },
  goDetailPage(e) {
    console.log("log",e.currentTarget.dataset[""]._id)
    let id = e.currentTarget.dataset[""]._id
    wx.navigateTo({
      url: '/pages/dishdetail/dishdetail?=id' + id
    })
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