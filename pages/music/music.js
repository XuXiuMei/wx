var dataBase = require('../../data/music-data.js');
var app = getApp();
Page({
  data: {
    isPlay: false,
    isAuto: true
  },
  onLoad: function () {
    var music = dataBase.musicList;
    this.setData({
      music: music
    })
    for (var i = 0; i < this.data.music.length; i++) {//把其他的音乐状态图标设禁用
      this.data.music[i].isPlay = false;
      this.setData({
        music: music
      })
    }
   // var self = this;
   // var mid = app.globalData.g_musicid;
   // if (app.globalData.g_isplay=="true") {
   //   self.data.music[mid].isPlay = true;//当前播放音乐图标开启
    //  self.setData({
    //    music: self.data.music
    //  })
    //  self.data.currentIndex = app.globalData.g_current;//获取全局变量当前播放音乐的图片索引
     // this.setData({
     //   currentIndex: self.data.currentIndex//显示索引图片，并不轮播
     // })
    //  this.setData({
       // isAuto: false
      //})
   // } else if (app.globalData.g_isplay=="pause"){
  //    self.data.music[mid].isPlay = false;//当前播放音乐图标禁用
  //    self.setData({
  //      music: self.data.music
  //    })
    //  self.data.currentIndex = app.globalData.g_current;//获取全局变量当前播放音乐的图片索引
    //  this.setData({
      //  currentIndex: self.data.currentIndex//显示索引图片，并不轮播
      //})
      //this.setData({
      //  isAuto: false
      //})
    //}else{
      //self.data.music[mid].isPlay = false;
      //self.setData({
    //    music: self.data.music
    //  })
   //   this.setData({
      //  isAuto: true
      //})
    //}
    // console.log(app.globalData.g_musicid )
    //this.setMusic(mid);

  },
  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  setMusic: function (mid) {
    var self = this;
    wx.onBackgroundAudioPlay(function () {
      self.data.music[mid].isPlay = true;
      self.setData({
        music: self.data.music
      })
      app.globalData.g_isplay = "true";
      app.globalData.g_current = mid;
      self.setData({
        currentIndex: mid
      })
    })

    wx.onBackgroundAudioPause(function () {
      self.data.music[mid].isPlay = false;
      self.setData({
        music: self.data.music
      })

      self.setData({
        isAuto: false
      })
      app.globalData.g_current = mid;
      self.setData({
        currentIndex: mid
      })
      wx.onBackgroundAudioPlay(function () {
        self.data.music[mid].isPlay = true;
        self.setData({
          music: self.data.music
        })
        self.setData({
          currentIndex: mid
        })
        app.globalData.g_isplay = "true";
      })
      app.globalData.g_isplay = "pause";
      self.setData({
        isAuto: false
      })
    })

    wx.onBackgroundAudioStop(function () {

      self.setData({
        isAuto: true
      })
      self.data.music[mid].isPlay = false;
      self.setData({
        music: self.data.music
      })
      app.globalData.g_isplay = "false";
    })
  },
  listTap: function (event) {
    var id = event.currentTarget.dataset.id;
    console.log(this)
    this.data.music[id].isPlay = false;
    this.setData({
      music: this.data.music
    })

    this.listenOn(event);
   this.setData({
      isAuto: true
     })
    for (var i = 0; i < this.data.music.length; i++) {
      this.data.music[i].isPlay = false;
      this.setData({
        music: this.data.music
      })
    }
  //  app.globalData.g_isplay == "false"
   // var self=this;
   // wx.onBackgroundAudioPlay(function () {
   //   self.data.music[id].isPlay = false;
   //   self.setData({
   //     music: self.data.music
  //    })
  //    self.setData({
  //      isAuto: true
  //    })
  //  })
  //  wx.onBackgroundAudioPause(function () {
   //   self.data.music[id].isPlay = false;
   //   self.setData({
   //     music: self.data.music
    //  })

      //self.setData({
        //isAuto: true
     // })
      //wx.onBackgroundAudioPlay(function () {
      //  self.data.music[id].isPlay = false;
      //  self.setData({
        //  music: self.data.music
       // })
        //self.setData({
        //  isAuto: true
        //})
     // })
    //})
  },
  picTap: function (event) {
    var id = event.currentTarget.dataset.id;
    app.globalData.g_musicid = id;
    this.setData({
      isAuto: false
    })

    if (this.data.music[id].isPlay) {
      wx.pauseBackgroundAudio();
      this.data.music[id].isPlay = false;
      this.setData({
        music: this.data.music
      })

    } else {
      for (var i = 0; i < this.data.music.length; i++) {
        this.data.music[i].isPlay = false;
        this.setData({
          music: this.data.music
        })
      }
      this.listenOn(event);
      this.data.music[id].isPlay = true;
      this.setData({
        music: this.data.music
      })

    }
    var self = this;
    // wx.onBackgroundAudioPlay(function (id) {
    //   console.log(id)
    //  self.setData({
    //    music: self.data.music
    // })
    // app.globalData.g_isplay = true;
    // })
    this.setMusic(id)

  },
  listenOn: function (imp) {
    var musicId = imp.currentTarget.dataset.id;
    app.globalData.g_musicid = musicId;
    var musicUrl = this.data.music[musicId].url;
    var title = this.data.music[musicId].name;
    var coverImg = this.data.music[musicId].img
    var self = this;
    wx.playBackgroundAudio({
      dataUrl: musicUrl,
      title: title,
      coverImgUrl: coverImg,
      fail: function () {

      }
    })

  }

})
