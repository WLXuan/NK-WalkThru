Page({
  data: {
    PayList1: [],
    Total:0,
    array1: ['楼层一', '楼层二'],
    array2: ['1', '2', '3', '4'],
    array3: ['1', '2', '3', '4','5','6','7','8'],
    index1:0,
    index2: 0,
    index3: 0,
    wai:0,
    windowname:'',
    TipTxt:''
  },
  SetWai(e) {
    if (e.detail.value){
    this.setData({
      wai: 1
    })
    }else{
      this.setData({
        wai: 0
      })
    }
  },
  SetValue(e){
    this.setData({
      TipTxt: e.detail.value
    })
  },
  section1Change(e){
    this.setData({
      index1: e.detail.value
    })
  },
  section2Change(e){
    this.setData({
      index2: e.detail.value
    })
  },
  section3Change(e) {
    this.setData({
      index3: e.detail.value
    })
  },
  goMyOrder(e){
    console.log("gomyorder", e.currentTarget.dataset[""])
    let l = JSON.stringify(e.currentTarget.dataset[""])
    let p = this.data.Total
    let n = this.data.windowname
    wx.navigateTo({
      // url: '/pages/confirm/confirm?PayList='+l+'&pay='+p+'&windowname='+n
      url: '/pages/myorder/myorder?PayList='+l+'&pay='+p+'&windowname='+n
    })
  },
  onLoad: function(options) {
    console.log("传来的数据",options)
    wx.setNavigationBarTitle({
      title: '确认订单',
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#FFFFFF'
    })
    if (options.PayList!=undefined){
    let l = JSON.parse(options.PayList)
    this.setData({
      PayList1: l,
      Total: options.pay,
      windowname: options.windowname
    })
    }

  }
})