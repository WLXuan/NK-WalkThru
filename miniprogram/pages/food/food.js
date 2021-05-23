// pages/food/food.js
Page({

  onLoad: function (options) {
    let searchKey = options.searchKey
    wx.cloud.database().collection('dish').where({
      name:wx.cloud.database().RegExp({
        regexp:searchKey,
        options:'i'
      })
    }).get().then(res => {
      console.log("搜索成功",res.data)
      this.setData({
        searchList: res.data
      })
    })
    .catch(res => {
      console.log("搜索失败",res)
    })


  },
  goDetailPage(e) {
    console.log("log",e.currentTarget.dataset[""]._id)
    let id = e.currentTarget.dataset[""]._id
    wx.navigateTo({
      url: '/pages/dishdetail/dishdetail?=id' + id
    })
  }

})