// miniprogram/pages/category/category.js
Page({
  goLikeDetail(e) {
    console.log("理科食堂", e.currentTarget.dataset[""]._id)
    let id = e.currentTarget.dataset[""]._id
    wx.navigateTo({
      // url: '/pages/likedetail/likedetail?=id' + id
      url: '/pages/detail/detail?=id' + id
    })
  },
  goWenkeDetail(e) {
    console.log("文科食堂", e.currentTarget.dataset[""]._id)
    let id = e.currentTarget.dataset[""]._id
    wx.navigateTo({
      // url: '/pages/likedetail/likedetail?=id' + id
      url: '/pages/wenkedetail/wenkedetail?=id' + id
    })
  },
  goQingzhenDetail(e) {
    console.log("清真食堂", e)
    wx.navigateTo({
      // url: '/pages/likedetail/likedetail?=id' + id
      url: '/pages/qingzhendetail/qingzhendetail'
    })
  },


  onLoad: function (options) {
    wx.cloud.init()
    wx.cloud.database().collection('like').get().then(like => {
      console.log("理科食堂", like)
      this.setData({
        likeList: like.data
      })
    })
    wx.cloud.database().collection('wenke').get().then(wenke => {
      console.log("文科食堂", wenke)
      this.setData({
        wenkeList: wenke.data
      })
    })

  },

})