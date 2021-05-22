// pages/food/food.js
Page({

  onLoad: function (options) {
    let searchKey = options.searchKey
    wx.cloud.database().collection('like').where({
      name:wx.cloud.database().RegExp({
        regexp:searchKey,
        options:'i'
      })
    }).get().then(res => {
      console.log("搜索成功",res)
    })
    .catch(res => {
      console.log("搜索失败",res)
    })


  },

})