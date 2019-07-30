const Fly = require('flyio/dist/npm/wx.js')
const fly = new Fly()

fly.config.baseURL = 'https://cac.thoughtworks.cn:3000'

fly.interceptors.response.use(
  (response) => {
    return response.data
  }
)

export default fly
