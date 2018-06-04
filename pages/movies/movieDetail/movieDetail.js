var util = require("../../../utils/util.js")
var app=getApp();
Page({

  data: {
    movie:{}
  },

  onLoad: function (options) {
   var movieId=options.Id;
   var dataUrl=app.globalData.doubanBase+'/v2/movie/subject/'+movieId;
   this.getMovieListData(dataUrl)
  },
  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  getMovieListData: function (url) {
    var self = this;
    wx.request({
      url: url,
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        self.processDoubanData(res.data)
      },
      fail: function () {
        console.log('失败了')
      }
    })
  },
  processDoubanData: function (data){
    console.log(data)
   var director={
     avatar:'',
     name:'',
     id:''
   };
   if(data.directors[0]!=null){
     if (data.directors[0].avatars!=null){
       director.avatar = data.directors[0].avatars.large
     }
     director.name = data.directors[0].name;
     director.id = data.directors[0].id;
   }
   var movie={
     movieImg: data.images ? data.images.large:'',
     country:data.countries[0],
     title:data.title,
     originalTitle: data.original_title,
     wishCount:data.wish_count,
     commentCount: data.comments_count,
     year:data.year,
     genres: data.genres.join('、'),
     stars: util.convertToStarsArray(data.rating.stars),
     score: data.rating.average,
     director: director,
     casts: util.convertToCastString(data.casts),
     castsInfo: util.convertToCastInfos(data.casts),
     summary:data.summary
   }
   this.setData({
     movie: movie
   })
  },
  previewTap:function(event){
    var src=event.currentTarget.dataset.src;
    wx.previewImage({
      current:src,
      urls: [src]
    })
  },
  choose:function(){
    wx.chooseAddress({
      success:function(res){
        console.log(res)
      }
    })
  }
})