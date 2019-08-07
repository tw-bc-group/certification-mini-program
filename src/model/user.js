import AV from 'leancloud-storage'

const FIELD_CERTS = 'certs'

// save () {
//   const acl = new AV.ACL()
//   acl.setPublicReadAccess(false)
//   acl.setPublicWriteAccess(false)
//   acl.setReadAccess(this.current(), true)
//   acl.setWriteAccess(this.current(), true)
//   return this.setACL(acl).save()
// }

function login () {
  return AV.User.loginWithWeapp({
    preferUnionId: true
  })
}

function self () {
  return AV.User.current()
}

async function addCert (certId) {
  const user = await self().fetch({ keys: FIELD_CERTS })
  const certs = user.get(FIELD_CERTS) || []
  certs.push(certId)
  user.set(FIELD_CERTS, certs)
  return user.save()
}

async function getAllCerts () {
  const user = await self().fetch({ keys: FIELD_CERTS })
  return user.get(FIELD_CERTS)
}

async function isMyCert (certId) {
  const user = await self().fetch({ keys: FIELD_CERTS })
  const certs = user.get(FIELD_CERTS)
  return certs.includes(certId)
}

async function removeCert (certId) {
  const user = await self().fetch({ keys: FIELD_CERTS })
  const certs = user.get(FIELD_CERTS)
  const removedCerts = certs.filter(c => c !== certId)
  user.set(FIELD_CERTS, removedCerts)
  return user.save()
}

export default {
  login,
  addCert,
  getAllCerts,
  isMyCert,
  removeCert
}
