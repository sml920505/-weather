const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}
const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowtemp : "",
    nowweather : "",
    nowweatherbackground : ""
  },
// 主要函数 ------------------------------------------------------------------
  getNow (callback) {
    wx.request({
      // 请求的参数就是一个json
      url: 'https://test-miniprogram.com/api/weather/now',
      data:{
        city:"北京市"
      },
      header:{
        "content-type":"application/json"
      },
      // json的值可以是一个函数
      // success后返回一个json对象
      // 箭头函数不会创建自己的this, 它只会从自己的作用域链的上一层继承this。
      // 上一层就是wx.request
      //这里success后,的值是一个Function函数
      // 成功之后返回的是一个json对象,这个对象需要你个变量做内存空间,
      // 所以要引入认为命名的变量res
      success:res =>{
        console.log(res.data)
        let result = res.data.result
        let temp = result.now.temp
        let weather = result.now.weather
        console.log(temp,weather)
        this.setData({
          nowtemp: temp + "°" ,
          nowweather : weatherMap[weather],
          nowweatherbackground : "/images/" + weather + "-bg.png"

          // 可用中括号访问对象的值,为什么不用weatherMap.weather? 因为
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather],
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },
 
  // ------------------------------------------------------------------
  /**
 * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.getNow()
    // 在json中 this 是调用函数的那个对象page,来引入上面的getnow
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    onload
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getNow(()=>{
      wx.stopPullDownRefresh()
    })
    },

  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})