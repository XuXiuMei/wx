var newsData = require('../../../data/news-data.js')
Page({
  onLoad:function(option){
    var newsId=option.id; 
    this.setData({
      id: newsId
    })
  var newsdata=newsData.newsList[newsId];
  this.setData({
    newsdata: newsdata
  })
  var newsColllecteds=wx.getStorageSync('newsColllecteds');
  if (newsColllecteds){
    var newsCollected = newsColllecteds[newsId];
    if (newsCollected){
      this.setData({
        collected: newsCollected
      })
    }
  }else{
    newsColllecteds={};
    newsColllecteds[newsId] = false;
    wx.setStorageSync('newsColllecteds', newsColllecteds)
  }
  },
  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onCollectedTap:function(event){
    var newsColllecteds = wx.getStorageSync('newsColllecteds');
    var newsCollected = newsColllecteds[this.data.id];
    newsCollected = !newsCollected;
    newsColllecteds[this.data.id] = newsCollected;
    wx.setStorageSync('newsColllecteds', newsColllecteds)
    this.setData({
      collected: newsCollected
    })
      wx.showToast({
      title: newsCollected?'收藏成功':'取消成功',
      duration:1000
    })
   
  },
  
  onShareTap:function(event){
    var itemList = ['分享给微信好友', '分享到微信朋友圈', '分享到QQ', '分享到微博']
    wx.showActionSheet({
      itemList: itemList ,
      itemColor:"#405f80",
      success: function (res) {
        wx.showModal({
          title: '无法' + itemList[res.tapIndex],
          content: '小程序服务暂不具媒体分享功能'
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  choose: function () {
    wx.chooseAddress({
      success: function (res) {
        console.log(res)
      }
    })
  }
})