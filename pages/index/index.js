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
  // -----------------增强的对象字面量 可以不用写fuction，Page(Object) 函数用来注册一个页面。接受一个 Object 类型参数，其指定页面的初始数据、生命周期函数、事件处理函数等。


  /**
   * 页面的初始数据
   */
  // data可以注释掉。不影响
  data: {
    nowtemp: "",
    nowweather: "",
    nowweatherbackground: "",
    hourlyWeather: []
  },
  // 主要函数 在page下面- 作为--------------
  getNow(callback) {
    wx.request({
      // 请求的参数就是一个json
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: "广州市"
      },
      header: {
        "content-type": "application/json"
      },
      // json的值可以是一个函数
      // success后返回一个json对象
      // 箭头函数不会创建自己的this, 它只会从自己的作用域链的上一层继承this所指代的对象。
      // 上一层就是wx.request
      // 这里success后,的值是一个Function函数
      // 成功之后返回的是一个json对象,这个对象需要你个变量做内存空间,
      // 所以要引入认为命名的变量res
      // 箭头函数是一种匿名函数，匿名函数不会复用
      success: res => {
        let result = res.data.result
        this.setNow(result)
        this.setHourlyweather(result)
      },



      // 回调函数开始
      complete: () => {
        callback && callback()
      }
      // callback是构造函数 callback是执行函数
    })
  },

  setNow(result) {
    let temp = result.now.temp
    let weather = result.now.weather
    console.log(temp, weather)
    this.setData({
      nowtemp: temp + "°",
      nowweather: weatherMap[weather],
      nowweatherbackground: "/images/" + weather + "-bg.png"
    })

    // 根据返回设置导航栏颜色
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[weather],
    })
    console.log(result)
  },


  setHourlyweather(result) {
    // 2 构造forecast数据 老师的 forcest = [{time:1,icnopath:xxx temp:12},{.....}]
    let nowHour = new Date().getHours()
    let hourlyweather = []
    let forecast = result.forecast
    // for x+=y 等价于 x = x+y
    // 因为api传过来的forecast只有8个
    for (let i = 0; i < 8; i += 1) {
      hourlyweather.push({
        time: (i * 3 + nowHour) + "时",
        iconpath: "/images/" + forecast[i].weather + "-icon.png",
        temp: forecast[i].temp
      })
    }
    hourlyweather[0].time = "现在"
    // this.setData({直接写jason就行了，或者写包含json的对象})
    this.setData({
      hourlyweather
    })
  },






  // ------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getNow()
    // 在json中 this 是调用函数的那个对象page,来引入上面的getnow
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    onload
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getNow(
      () => {
        wx.stopPullDownRefresh()
      })
  },
  // 参数应该是一个函数，而不是函数的结果


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})