import AV from 'leancloud-storage'
import User from './user'
import Photo from './photo'

AV.init({
  appId: 'gVpjrW4U6TfrM4AGmxX9toma-9Nh9j0Va',
  appKey: '5ypXCePx32LNLbO0sdSxcBlw'
})

export default {
  User,
  Photo
}
