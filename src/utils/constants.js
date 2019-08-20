let qrCodeReg = /http:\/\/cac.thoughtworks.cn:5000\/certification\//

if (process.env.NODE_ENV === 'production') {
  qrCodeReg = /https:\/\/cac.thoughtworks.cn\/certification\//
}

export { qrCodeReg }
