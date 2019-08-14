import AV from 'leancloud-storage'

const LEANCLOUD_CLASS = 'Photo'
const INDEX = 'certId'
const ALL_NEED_TYPE_PHOTOS = ['png', 'simpleSvg']

async function fetchPhotoUrl (certId, key) {
  const query = new AV.Query(LEANCLOUD_CLASS)
  query.equalTo(INDEX, certId)
  query.include(ALL_NEED_TYPE_PHOTOS)
  const result = await query.find()
  if (result.length > 0) {
    return result[0].get(key).get('url')
  }
  return ''
}

export async function fetchSimplePhotoUrl (certId) {
  return fetchPhotoUrl(certId, 'simpleSvg')
}

export async function fetchFullEditionPhotoUrl (certId) {
  return fetchPhotoUrl(certId, 'png')
}

export default {
  fetchSimplePhotoUrl,
  fetchPhotoUrl
}
