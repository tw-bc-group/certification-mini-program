import fly from '../utils/request'

function getCertificationInfo (certId) {
  return fly.get(`/certifications/${certId}`)
}

export default {
  getCertificationInfo
}
