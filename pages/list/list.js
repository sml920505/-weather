// pages/list/list.js
const dayMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

Page({

  data: {

    city:"广州市"
  },
  // 主函数
  getWeeklyWeather(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',

      data: {
        city: this.data.city,
        time: new Date().getTime()
      },

      success: res => {
        let result = res.data.result
        console.log(result)

        let weekWeather = []
        for (let i = 0; i < 7; i++) {
          let date = new Date()
          date.setDate(date.getDate() + i)
          weekWeather.push({
            day: dayMap[date.getDay()],
            date: `${date.getFullYear()} - ${date.getMonth()} - ${date.getDate()}`,
            temp: `${result[i].minTemp}° - ${result[i].maxTemp}°`,
            iconPath: `/images/${result[i].weather}-icon.png`

          })
          weekWeather[0].day = "今天"
          // 修改的时候 直接 变量 = 值
          // 创建变量的时候 才用var let

        }
        this.setData({
          weekWeather
        })


      },
      complete: () => {
        callback && callback()
      }
    })
  },
  // 生命周期
  onLoad(options) {
    this.setData({
      city:options.city
    })
    this.getWeeklyWeather()
  },
  // 下拉
  onPullDownRefresh() {
    this.getWeeklyWeather(
      () => {
        wx.stopPullDownRefresh()
      })
  }

})