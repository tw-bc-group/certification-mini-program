import AV from 'leancloud-storage'

const FIELD_CERTS = 'certs'

export default class User extends AV.User {
  // save () {
  //   const acl = new AV.ACL()
  //   acl.setPublicReadAccess(false)
  //   acl.setPublicWriteAccess(false)
  //   acl.setReadAccess(this.current(), true)
  //   acl.setWriteAccess(this.current(), true)
  //   return this.setACL(acl).save()
  // }

  login () {
    return this.loginWithWeapp({
      preferUnionId: true
    })
  }

  async addCert (certId) {
    const user = await AV.User.current().fetch({ keys: FIELD_CERTS })
    const certs = user.get(FIELD_CERTS) || []
    certs.push(certId)
    user.set(FIELD_CERTS, certs)
    return user.save()
  }

  async getAllCerts () {
    const user = await this.fetch({ keys: FIELD_CERTS })
    return user.get(FIELD_CERTS)
  }

  async isMyCert (certId) {
    const user = await this.fetch({ keys: FIELD_CERTS })
    const certs = user.get(FIELD_CERTS)
    return certs.includes(certId)
  }

  async removeCert (certId) {
    const user = await this.fetch({ keys: FIELD_CERTS })
    const certs = user.get(FIELD_CERTS)
    const removedCerts = certs.filter(c => c !== certId)
    user.set(FIELD_CERTS, removedCerts)
    return user.save()
  }
}

AV.User.register(User)
