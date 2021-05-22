// miniprogram/pages/my/my.js
const app = getApp();
Page({
// 页面的初始数据
  data: {
    isShowUserName: false,
    userInfo: null,
    nickName: ''
  },
  onGotUserInfo: function(e){

  },
  goMyOrder(){

  },
  login(){
    let that = this
    console.log("点击登录")
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res)=>{
        console.log("授权成功",res.userInfo)
        that.setData({
          nickName: res.userInfo.nickName
        })
      },
      fail: (res) => {
        console.log("授权失败")
      }
    })
  },
// 生命周期函数--监听页面加载
  onLoad: function (options) {
    wx.cloud.init()
    wx.cloud.database().collection('account').get().then(res => {
      console.log("个人中心", res)
      this.setData({
        accountList: res.data
      })
    })

  },
})