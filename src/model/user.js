import AV from 'leancloud-storage'

const FIELD_CERTS = 'certs'
const FIELD_COLLECTIONS = 'collections'

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
  return add(certId, FIELD_CERTS)
}

async function addToMyCollections (certId) {
  return add(certId, FIELD_COLLECTIONS)
}

async function add (certId, field) {
  const user = await self().fetch({ keys: field })
  const certs = user.get(field) || []
  certs.push(certId)
  user.set(field, certs)
  return user.save()
}

async function getAllCollections () {
  return fetchAttr(FIELD_COLLECTIONS)
}

async function getAllCerts () {
  return fetchAttr(FIELD_CERTS)
}

async function fetchAttr (field) {
  const user = await self().fetch({ keys: field })
  return user.get(field)
}

async function isMyCert (certId) {
  const certs = await fetchAttr(FIELD_CERTS)
  return certs.includes(certId)
}

async function isMyCollection (certId) {
  const certs = await fetchAttr(FIELD_COLLECTIONS)
  return certs.includes(certId)
}

async function removeCert (certId) {
  return remove(certId, FIELD_CERTS)
}

async function removeCollection (certId) {
  return remove(certId, FIELD_COLLECTIONS)
}

async function remove (certId, field) {
  const user = await self().fetch({ keys: field })
  const certs = user.get(field)
  const removedCerts = certs.filter(c => c !== certId)
  user.set(field, removedCerts)
  return user.save()
}

export default {
  login,
  addCert,
  getAllCerts,
  isMyCert,
  removeCert,
  addToMyCollections,
  getAllCollections,
  isMyCollection,
  removeCollection
}
