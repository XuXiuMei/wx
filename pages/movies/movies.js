var util = require('../../utils/util.js')
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{},
    containerShow:true,
    searchContainerShow:false,
    searchResult:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase +"/v2/movie/in_theaters"+"?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon","即将上映");
    this.getMovieListData(top250Url,"top250","top250");
  },
  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  getMovieListData: function (url, settedKey, listTitle){
    var self=this;
   wx.request({
     url: url,
     method: 'get',
     header: {
       'content-type': 'application/json'
     },
     success: function (res) {
       self.processDoubanData(res.data, settedKey, listTitle)
     },
     fail: function () {
       console.log('失败了')
     }
   })
 },
processDoubanData: function (DoubanRes,settedKey,listTitle){
    var movies=[];
    for (var idx in DoubanRes.subjects){
      var subject = DoubanRes.subjects[idx];
      var title = subject.title;
      if(title.length>=6){
        title=title.substring(0,6)+'...'
      }
      var temp={
        stars: util.convertToStarsArray(subject.rating.stars),
        title:title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData={};
    readyData[settedKey] = { listTitle: listTitle,movies:movies}
    this.setData(readyData)
  },
 onMoreTap: function (event) {
   var titleKey=event.currentTarget.dataset.listtitle;
      wx.navigateTo({
        url: 'moreMovie/moreMovie?titleKey=' + titleKey
        
      })
    } ,
 onBindFocus:function(event){
  this.setData({
    containerShow: false,
    searchContainerShow: true
  })
 },
 onImgTap:function(event){
   this.setData({
     containerShow: true,
     searchContainerShow: false,
     searchResult:{}
   })
  
 },
 onBindConfirm:function(event){
   var text=event.detail.value;
   var searchUrl=app.globalData.doubanBase+"/v2/movie/search?q="+text;
   this.getMovieListData(searchUrl,"searchResult","")
  
 },
onMovieTap:function(event){
  var movieId = event.currentTarget.dataset.movieid;
   wx.navigateTo({
     url: 'movieDetail/movieDetail?Id='+movieId
   })
  }

})