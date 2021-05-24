// miniprogram/pages/index/index.js
let searchKey = ''
Page({
  goDetail(e) {
    console.log("轮播图", e.currentTarget.dataset[""]._id)
    let id = e.currentTarget.dataset[""]._id
    wx.navigateTo({
      url: '/pages/detail/detail?=id' + id
    })
  },
  gojianbing(e) {
    console.log("煎饼", e)
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?=id' + id
    })
  },
  goLikeDetail(e) {
    console.log("理科食堂", e.currentTarget.dataset[""]._id)
    let id = e.currentTarget.dataset[""]._id
    wx.navigateTo({
      url: '/pages/likedetail/likedetail?=id' + id
    })
  },

  onLoad: function (options) {
    wx.cloud.init()
    wx.cloud.database().collection('swiper').get().then(res => {
      console.log("swiper轮播图", res)
      this.setData({
        swiperList: res.data
      })
    })
    wx.cloud.database().collection('like').get().then(like => {
      console.log("理科食堂", like)
      this.setData({
        likeList: like.data
      })
    })
    this.getHotList()

  },
  goDetailPage(e) {
    console.log("log",e.currentTarget.dataset[""]._id)
    let id = e.currentTarget.dataset[""]._id
    wx.navigateTo({
      url: '/pages/dishdetail/dishdetail?=id' + id
    })
  },
  getSearch(e){
    console.log(e.detail.value)
    searchKey = e.detail.value
  },
  goSearch(e) {
    if(searchKey&&searchKey.length>0){
      wx.navigateTo({
        url: '/pages/food/food?searchKey='+searchKey,
      })
    }else{
      wx.showToast({
        icon: 'none',
        title: '搜索词为空',
      })
    }
  },
  getHotList() {
    wx.cloud.database().collection('dish').orderBy("sales", 'desc')
    .limit(8).get().then(res => {
      console.log("dish", res)
      this.setData({
        hotList: res.data
      })
    })
  },
  goHot() {
    wx.navigateTo({
      url: '/pages/hotlist/hotlist',
    })
  }

})