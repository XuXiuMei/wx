var dataBase = require('../../../data/goods-data.js');
Page({
  data: {
    sumChecked: 0,
    countChecked: 0,
    isPickedobj: {},
    countObj: {},
    checkepriceObj:{}
  },

  onLoad: function (options) {
  
    var goods = dataBase.goodsList;
    var prods = JSON.parse(wx.getStorageSync('prods') || '{}');
    this.setData({
      prods: prods
    })
    var arr = [];
    for (var i = 0; i < goods.length; i++) {
      for (let key in prods) {
        if (key == goods[i].id) {
          arr.push(goods[i])
        }
      }
    }
    var self = this;
    for (var i = 0; i < arr.length; i++) {
      arr[i].number ? "" : self.data.prods[i]
    }
    this.setData({
      myGoods: arr
    })

  },
  buy: function () {
    wx.chooseAddress({
      success: function (res) {
        console.log(res)
      }
    })
  },
  onChange: function (event) {

    var picked = event.detail.value;
    console.log(picked)
    var pickedId = event.currentTarget.dataset.pickedid;
    this.data.isPickedobj[pickedId] = picked;
    console.log(this.data.isPickedobj)
    var isPickedArr = [];
    var self = this;
    for (var key in self.data.isPickedobj) {
      if (self.data.isPickedobj[key]) {
        isPickedArr.push(key)
      }
    }
    console.log(isPickedArr)
    var checkepriceObj = {}
    for (var j = 0; j < isPickedArr.length; j++) {
      for (var i = 0; i < self.data.myGoods.length; i++) {
        if (Number(isPickedArr[j]) == self.data.myGoods[i].id) {
          var thisKey = isPickedArr[j];
          checkepriceObj[thisKey] = self.data.myGoods[i].money
        }
      }
    }

    console.log(checkepriceObj);
    var prods = JSON.parse(wx.getStorageSync('prods') || '{}');
    var countObj = {}
    for (var i = 0; i < isPickedArr.length; i++) {
      for (var k in prods) {
        if (k == isPickedArr[i]) {
          countObj[isPickedArr[i]] = prods[k]

        }
      }
    }
    console.log(countObj, checkepriceObj)
    var sum = 0;
    var count = 0;
    for (var k in checkepriceObj) {
      for (var key in countObj) {
        if (k == key) {
          count += countObj[key];
          sum += checkepriceObj[k] * countObj[key]
        }
      }
    }
    this.setData({
      sumChecked: sum,
      countChecked: count,
      countObj: countObj,
      checkepriceObj: checkepriceObj
    })

  },
  sub: function (event) {
    var idx = event.currentTarget.dataset.subid;
    if (JSON.stringify(this.data.countObj) != "{}") {

      if (this.data.countObj[idx]>1){
        this.data.countObj[idx] = this.data.countObj[idx] - 1;
      }else{
        return;
      }
      this.setData({
        countObj: this.data.countObj
      })
      if (this.data.countChecked>1){
        var price=0;
        for(var key in this.data.checkepriceObj){
          if(key==idx){
            price = this.data.checkepriceObj[key]
          }
        }
        this.data.countChecked = this.data.countChecked - 1;
        this.data.sumChecked = this.data.sumChecked-price;
        this.setData({
          sumChecked: this.data.sumChecked
        })
      }else{

      }
      
      this.setData({
        countChecked: this.data.countChecked
      })

    }
    var prods = JSON.parse(wx.getStorageSync('prods') || '{}');
    if (prods[idx] && prods[idx]>1){
      prods[idx] = prods[idx]-1;

    }else{
      prods[idx]=1;
    }
   
    wx.setStorageSync('prods', JSON.stringify(prods));
    this.setData({
      prods: prods
    })
    var addcount = 0;
    var self = this;
    for (var key in self.data.prods) {
      addcount = addcount + self.data.prods[key];

    }

    wx.setStorageSync('addcount', addcount);


  },
  add: function (event) {

    var idx = event.currentTarget.dataset.addid
    if (JSON.stringify(this.data.countObj) != "{}") {
      console.log(666)
        this.data.countObj[idx] = this.data.countObj[idx] + 1;
         this.setData({
        countObj: this.data.countObj
      })

  
     
      var price = 0;
      for (var key in this.data.checkepriceObj) {
        if (key == idx) {
          price = this.data.checkepriceObj[key]
        }
      }
      this.data.countChecked = this.data.countChecked + 1;
      this.data.sumChecked = this.data.sumChecked + price;
      this.setData({
        sumChecked: this.data.sumChecked
      })
      this.setData({
        countChecked: this.data.countChecked
      })
    }
    var prods = JSON.parse(wx.getStorageSync('prods') || '{}');
    prods[idx] = prods[idx] ? prods[idx] + 1 : 1;
    var addcount = wx.getStorageSync('addcount') || 0;
    addcount += 1;
    wx.setStorageSync('prods', JSON.stringify(prods));
    wx.setStorageSync('addcount', addcount);
    this.setData({
      prods: prods
    })

  },
  delone: function (event) {
    console.log(event)
    var idx = event.currentTarget.dataset.delid
    var prods = JSON.parse(wx.getStorageSync('prods') || '{}');
    var addcount = wx.getStorageSync('addcount') - prods[idx]
    wx.setStorageSync('addcount', addcount);
    delete prods[idx];
    console.log(prods)
    wx.setStorageSync('prods', JSON.stringify(prods));
    for (var i = 0; i < this.data.myGoods.length; i++) {
      if (this.data.myGoods[i].id == idx) {
        this.data.myGoods.splice(i, 1);
      }
    }
    this.setData({
      myGoods: this.data.myGoods,
      prods: prods
    })
  }
})