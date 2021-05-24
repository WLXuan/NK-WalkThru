// miniprogram/pages/my/my.js
const app = getApp();
Page({
// 页面的初始数据
  data: {
    isShowUserName: false,
    userInfo: '',
    nologin: true
  },
  onGotUserInfo: function(e){

  },
  goMyOrder(){
    wx.navigateTo({
      url: '/pages/myorder/myorder',
    })

  },
  login(){
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: res => {
        let user = res.userInfo
        //缓存用户信息
        wx.setStorageSync('user', user)
        console.log("授权成功",res.userInfo)
        this.setData({
          userInfo: user,
          nologin:false
        })
      },
      fail: (res) => {
        console.log("授权失败")
      }
    })
    wx.setStorageSync('flag', 0)
  },
  loginout(){
    this.setData({
      userInfo:''
    })
    wx.setStorageSync('user', '')
  },
// 生命周期函数--监听页面加载
  onLoad: function (options) {
    let user = wx.getStorageSync('user')
    this.setData({
      userInfo: user,
      nologin: false
    })
  },
})