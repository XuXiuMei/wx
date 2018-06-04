var newsData = require('../../data/news-data.js')
Page({
  data: {
    
  },
  onLoad: function () {
    this.setData({ news: newsData.newsList});

  },
  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onDetail:function(event){
  var newsId=event.currentTarget.dataset.newsid;
  wx.navigateTo({
    url: 'news-detail/news-detail?id='+newsId
  })
  }
})
