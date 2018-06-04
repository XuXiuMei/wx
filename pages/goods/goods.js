var dataBase = require('../../data/goods-data.js');
Page({
  data: {
    
  },
  onLoad: function () {
    var goods = dataBase.goodsList;

    this.setData({
      goods: goods
    })
  },
  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onGoodTap:function(event){
    var goodId=event.currentTarget.dataset.goodid;
    wx.navigateTo({
      url: 'goodsDetail/goodsDetail?goodId=' + goodId
    })
  }
})
