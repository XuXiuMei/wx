var app=getApp();
var util=require('../../../utils/util.js')
Page({
  data: {
  NavigationTitle:"",
  movies:[],
  requestUrl:"",
  totalCount:0,
  isEmpty:true
  },
  onLoad: function (options) {
    var titleKey=options.titleKey
    this.data.NavigationTitle = titleKey;
    var dataUrl="";
    switch (titleKey) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon";
        break;
      case "top250":
        dataUrl = app.globalData.doubanBase +"/v2/movie/top250";
        break;
    }
    console.log(dataUrl)
    this.data.requestUrl=dataUrl;
    this.getMovieListData(dataUrl)
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
  onScrollLower: function () {
    var nextUrl=this.data.requestUrl+"?start="+this.data.totalCount+"&count=20";
    console.log(nextUrl)
    this.getMovieListData(nextUrl);
    wx.showNavigationBarLoading();
  },
  onPullDownRefresh: function () {
    var nextUrl = this.data.requestUrl + "?start=0&count=20";
    this.data.isEmpty = true;
    this.data.totalCount=0;
    this.getMovieListData(nextUrl);
    wx.showNavigationBarLoading();
  },
  processDoubanData: function (DoubanRes) {
    var movies = [];
    for (var idx in DoubanRes.subjects) {
      var subject = DoubanRes.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...'
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    if (!this.data.isEmpty) {
      var totalMovies = this.data.movies.concat(movies);
    }
    else {
      var totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    })
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
    this.data.totalCount += 20;
  },
  
  onReady:function(event){
    wx.setNavigationBarTitle({
      title: this.data.NavigationTitle
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movieDetail/movieDetail?Id=' + movieId
    })
  }
})