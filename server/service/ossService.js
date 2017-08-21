'use strict'

var mongodbDao = require('../storage/mongodbDao').getWorkInstance()
var OSS = require('ali-oss')
var STS = OSS.STS
var co = require('co')

var sts = new STS({
  accessKeyId: '',
  accessKeySecret: ''
})
var rolearn = 'acs:ram:::role/ramcatimguploadonly'

var policy = {
  'Version': '1',
  'Statement': [
    {
      'Effect': 'Allow',
      'Action': [
        'oss:GetObject',
        'oss:PutObject'
      ],
      'Resource': [
        'acs:oss:*:*:cancat-imgs',
        'acs:oss:*:*:cancat-imgs/*'
      ]
    }
  ]
}

class OssUploadService {

  getOssToken (req, res) {
    var result = co(function* () {
      var token = yield sts.assumeRole(rolearn, policy, 15 * 60, 'test')
      res.json({
        token: token.credentials
      })
    }).catch(function (err) {
    })
  }
}

module.exports = new OssService()
