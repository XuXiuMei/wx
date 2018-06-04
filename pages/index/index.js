Page({
  onReady:function(){
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onTap: function (event) {
   
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)//错误信息
  console.log(e.detail.userInfo)//对象格式
 console.log(e.detail.rawData)//json格式
    if (e.detail.userInfo != null){
     wx.switchTab({
       url: "../news/news"
     });
     wx.showToast({
       title: '登陆成功',
       icon: 'success'
     })
   }else{
     wx.showToast({
       title: '获取信息失败',
       icon:'none'
     })
   }
    
  }
})
