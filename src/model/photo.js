import AV from 'leancloud-storage'

const LEANCLOUD_CLASS = 'Photo'
const INDEX = 'certId'

export async function fetchPhotoUrl (certId) {
  const query = new AV.Query(LEANCLOUD_CLASS)
  query.equalTo(INDEX, certId)
  query.include(['png', 'svg'])
  const result = await query.find()
  result[0].get('png').get('url')
  return result[0].get('png').get('url')
}

export default {
  fetchPhotoUrl
}
