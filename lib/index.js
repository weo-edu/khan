/**
 * Imports
 */

var oauth = require('./oauth')
var oauthRequest = require('./oauth-request')
var khan = require('./khan')
var util = require('./util')

/**
 * Bind
 */

function bind (fns) {
  return function (consumerKey, consumerSecret, accessToken, tokenSecret) {
    var request = arguments.length
      ? oauthRequest(consumerKey, accessToken)
      : util.request

    return util.curryAll(fns, request)
  }
}

/**
 * Exports
 */

module.exports = {
  oauth: bind(oauth),
  khan: bind(khan)
}
