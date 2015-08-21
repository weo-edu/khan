/**
 * Imports
 */

var oauth = require('./oauth')
var oauthRequest = require('./oauth-request')
var khan = require('./khan')
var util = require('./util')

/**
 * Exports
 */

module.exports = {
  oauth: oauth,
  khan: function (consumerKey, accessToken) {
    var request = arguments.length
      ? oauthRequest(consumerKey, accessToken)
      : util.request

    return util.curryAll(khan, request)
  }
}
