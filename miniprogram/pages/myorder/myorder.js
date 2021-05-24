Page({
  data: {
    paylist1: []
  },
  onLoad: function (options) {
    this.setData({
      paylist1: wx.getStorageSync('paylist')
    })
    console.log("paylist",this.data.paylist1)
    console.log("传来的数据",options)
    if (options.PayList!=undefined){
      let t = wx.getStorageSync('paylist')
      if(wx.getStorageSync('flag') == 0){
        wx.setStorageSync('flag', 1)
        let ll = []
        let l = JSON.parse(options.PayList)
        console.log("l的值", l)
        ll.push(l)
        ll.push(options.pay)
        ll.push(options.windowname)
        wx.setStorageSync('paylist', ll)
        let lll = []
        lll.push(ll)
        this.setData({
          paylist1: lll
        })
        console.log("lll的值", lll)
      }
      else if(wx.getStorageSync('flag') == 1){
        wx.setStorageSync('flag', 2)
        let l = JSON.parse(options.PayList)
        let tmp = wx.getStorageSync('paylist')
        console.log("tmp的值", tmp)
        let tt = []
        tt.push(tmp)
        let lll = []
        lll.push(l)
        lll.push(options.pay)
        lll.push(options.windowname)
        tt.push(lll)
        console.log("tt的值", tt)
        wx.setStorageSync('paylist', tt)
        this.setData({
          paylist1: tt
        })
      }
      else{
        let l = JSON.parse(options.PayList)
        let tmp = wx.getStorageSync('paylist')
        let k = []
        console.log("tmp的值", tmp)
        k.push(l)
        k.push(options.pay)
        k.push(options.windowname)
        tmp.push(k)
        console.log("tmp的值2", tmp)
        wx.setStorageSync('paylist', tmp)
        this.setData({
          paylist1: tmp
        })
        console.log("paylist1",this.data.paylist1)
      }
      
    }
  },
  backIndex(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  }

})