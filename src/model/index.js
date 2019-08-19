import AV from 'leancloud-storage'
import User from './user'
import Photo from './photo'

AV.init({
  appId: process.env.LC_APP_ID,
  appKey: process.env.LC_APP_KEY
})

export default {
  User,
  Photo
}
