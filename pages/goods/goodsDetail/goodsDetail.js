var dataBase = require('../../../data/goods-data.js');
Page({

  data: {
      number:1,
      isShow:false,
      num:0,
      addcount:0
  },
  onShow: function () {
    var addcount = wx.getStorageSync('addcount') || 0;
    if (addcount != 0) {
      this.setData({
        num: addcount,
        addcount: addcount,
        isShow: true
      })
    }
  },
  onLoad: function (options) {
    
    var good="";
    var goods = dataBase.goodsList;
      var goodId=options.goodId;
      for (var i = 0; i < goods.length; i++) {
        if (goods[i].id == goodId) {
          good=goods[i];
        }
      }
      this.setData({
        good:good,
        id:goodId
      })
      var prods = JSON.parse(wx.getStorageSync('prods') || '{}');
      var pro = this.data.id;
  
    
     
  },

  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  buy: function () {
    wx.chooseAddress({
      success: function (res) {
        console.log(res)
      }
    })
  },
  substract:function(){
    var number=this.data.number-1;
    if(number<=0){
      this.setData({
        number:0
      })
    }else{
      this.setData({
        number: number
      })
    }
   
  },
  add:function(){
    var number = this.data.number + 1;
      this.setData({
        number: number
      })
  },
  addShopCart:function(){
        if(this.data.number!=0){
          this.setData({
            addcount: this.data.addcount+this.data.number,
            isShow:true,
          })
          this.setData({
            num: this.data.addcount
          })
          var id = this.data.id;
          var prods = JSON.parse(wx.getStorageSync('prods') || '{}');
          prods[id] = prods[id] ? prods[id] + this.data.number : this.data.number;
             wx.setStorageSync('prods', JSON.stringify(prods));
             wx.setStorageSync('addcount', this.data.addcount);
        }

    
  },
  goShopCart:function(){
    wx.navigateTo({
      url: '../shopCart/shopCart'
    })
  }
})