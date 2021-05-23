var cate ={};
var win_name = '';
var cate_name = [];
var finallist = [];
Page({
  data: {
    categoryList: [],
    Total: 0,
    FoodLength: 0,
    realFoodList: [],
    indexId: 0,
    winHeight: 0,
    PayList: [],
    cart: false,
    bg: false,
    scrollTopId: '',
    curNav: '',
    winHeight: 0,
    heightArr: [],
    forindex: true,
    zindex: 0
  },
  GoPay(){
    if(this.data.PayList.length== 0){
      wx.showToast({
        title: '你还没有点餐',
        image: '../statc/1.jpg',
        duration: 2000
      })
    }else{

    let l = JSON.stringify(this.data.PayList)
      let p = this.data.Total
    wx.navigateTo({
      url: '/pages/confirm/confirm?PayList='+l+'&pay='+p
    })
    }

  },
  jumpIndex(e) {
    var id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index;
    this.setData({
      scrollTopId: id,
      curNav: index
    })
  },
  PayList() {
    this.setData({
      cart: !this.data.cart,
      bg: !this.data.bg
    })
  },
  onScroll(e) {
    var that = this;
    var h = 0;
    var heightArr = [];
    let show = that.data.forindex
    let index = that.data.zindex
    let scrollTop = e.detail.scrollTop
    let scrollArr = that.data.heightArr
    wx.createSelectorQuery().selectAll('.Box1').boundingClientRect(function(rect) { //selectAll会选择所要含有该类名的盒子
    }).exec(function(res) {
      res[0].forEach((item) => {
        h += item.height-100;
        heightArr.push(h);
      })
      that.setData({
        heightArr: heightArr
      })
    });
    for (let i = 0; i < scrollArr.length; i++) {
      if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
        if (show) {
          that.setData({
            curNav: 0,
            forindex: false,
            zindex: 0
          })
          return
        }
      } else if (scrollTop >= (scrollArr[i - 1]) && scrollTop < scrollArr[i]) {
        that.setData({
          curNav: i,
          forindex: true,
          zindex: 1
        })
      }
    }
  },
  clearPayList(list) {
    var that = this
    let aa = that.data.realFoodList.length - 1
    for (var i = 0; i <= aa; i++) {
      let bb = that.data.realFoodList[i].Food.length - 1
      for (var j = 0; j <= bb; j++) {
        that.data.realFoodList[i].Food[j].Number = 0
      }
    }
    that.setData({
      'PayList': [],
      FoodLength: 0,
      Total: 0,
      realFoodList: that.data.realFoodList,
      cart: false,
      bg: false
    });
  },
  //减数量
  RmTotal(e) {
    var that = this
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    this.data.realFoodList[parentIndex].Food[index].Number--;
    var mark = 'a' + index + 'b' + parentIndex
    var price = this.data.realFoodList[parentIndex].Food[index].pay;
    var num = this.data.realFoodList[parentIndex].Food[index].Number;
    var name = this.data.realFoodList[parentIndex].Food[index].name;
    var Id = this.data.realFoodList[parentIndex].Food[index].FoodId;
    var obj = {
      pay: price,
      Number: num,
      mark: mark,
      name: name,
      index: index,
      parentIndex: parentIndex,
      FoodId: Id
    };
    var carArray1 = this.data.PayList.filter(item => item.mark != mark)
    carArray1.push(obj)
    this.setData({
      PayList: carArray1,
      realFoodList: this.data.realFoodList
    })
    if (that.data.PayList.length > 1) {
      that.Relist();
    }
    this.calTotalPrice();

  },
  //计算总价
  calTotalPrice() {
    var carArray = this.data.PayList;
    var totalPrice = 0;
    var totalCount = 0;
    for (var i = 0; i < carArray.length; i++) {
      totalPrice += carArray[i].pay * carArray[i].Number;
      totalCount += carArray[i].Number
    }
    this.setData({
      Total: totalPrice,
      FoodLength: totalCount,
    });
  },
  Relist() {
    var that = this
    let aa = that.data.PayList.length - 1
    let flag = false
    for (let i = 0; i < aa; i++) {
      for (let j = aa; j > i; j--) {
        //每次都把最小的元素放在最前面
        if (that.data.PayList[j].Number > that.data.PayList[j - 1].Number) {
          let temp = that.data.PayList[j];
          that.data.PayList[j] = that.data.PayList[j - 1];
          that.data.PayList[j - 1] = temp;
          flag = true;
          that.setData({
            PayList: that.data.PayList
          })
        }
        if (!flag) {
          break;
        }
      }
    }
  },
  //加数量
  AddTotal: function(e) {
    var that = this
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    this.data.realFoodList[parentIndex].Food[index].Number++;
    var mark = 'a' + index + 'b' + parentIndex
    var price = this.data.realFoodList[parentIndex].Food[index].pay;
    var num = this.data.realFoodList[parentIndex].Food[index].Number;
    var name = this.data.realFoodList[parentIndex].Food[index].name;
    var Id = this.data.realFoodList[parentIndex].Food[index].FoodId;
    var obj = {
      pay: price,
      Number: num,
      mark: mark,
      name: name,
      index: index,
      parentIndex: parentIndex,
      FoodId: Id
    };
    var carArray1 = this.data.PayList.filter(item => item.mark != mark)
    carArray1.push(obj)
    this.setData({
      PayList: carArray1,
      realFoodList: this.data.realFoodList
    })
    if (that.data.PayList.length > 1) {
      that.Relist();
    }
    this.calTotalPrice();
  },
  onLoad: function(options) {
    cate = {}
    finallist = []
    var that = this
    wx.setNavigationBarTitle({
      // title: '菜单',
    })
    wx.setNavigationBarColor({
      // frontColor: '#000000',
      backgroundColor: '#4b0082'
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight: res.windowHeight - 200
        });
      }
    });
    console.log("携带数据", options)
    let id = options[""].replace('id','')
    wx.cloud.database().collection('wenke').doc(id).get().then(rres => {
      console.log("详情页", rres.data.name)
      this.setData({
        like: rres.data
      })
      win_name = rres.data.name
      console.log("this.winname", win_name)
      //筛选该窗口菜品种类
      wx.cloud.database().collection('categorys').where({
        window_name: rres.data.name 
      }).get().then(res => {
        console.log("筛选的窗口名", res.data)
        this.setData({
          categoryList : res.data
        })
        cate_name = res.data
        //筛选菜品
        wx.cloud.database().collection('dish')
        .where({
          window: rres.data.name
        }).get().then(ress => {
          console.log("获取dish",ress.data)
          console.log("获取category",res.data)
          var tmp = 1
          for (let i = 0; i < res.data.length; i++) {
            var categ = []
            // console.log("category循环次数",i)
            for (let k = 0; k < ress.data.length; k++) {
              if(ress.data[k].category==res.data[i].category_name){
                // console.log("筛选分类",ress.data[k].category)
                var temp = {
                  name: ress.data[k].name,
                  FoodId: tmp,
                  Number: 0,
                  pay: ress.data[k].price,
                  text: '好吃',
                  sold: ress.data[k].sales,
                  picture: ress.data[k].picture
                }
                categ.push(temp)
              }
              // console.log("dish循环次数",k)
              
            }
            console.log("cate[i]",categ)
            var cateend = {
              id: i,
              name: res.data[i].category_name,
              Food: categ
            }
            finallist.push(cateend)
            console.log("finallist",finallist)
          }
          this.setData({
            realFoodList: finallist
          })
        })
        
        
      })
    })
    
  },
})