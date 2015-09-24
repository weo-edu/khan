/**
 * Imports
 */

var sign = require('oauth-sign').sign
var util = require('./util')

/**
 * OAuth requests
 */

function initialize (consumerKey, consumerSecret, tokenSecret, accessToken) {
  if (!consumerKey) throw new Error('Consumer key is required')
  if (!consumerSecret) throw new Error('Consumer secret is required')

  var defaults = {
    oauth_consumer_key: consumerKey,
    oauth_version: '1.0',
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: util.timestamp(),
    oauth_token: accessToken
  }

  return function (url, params, method, secret) {
    params = params || {}
    method = method || 'get'
    params = util.extend({}, defaults, {
      oauth_nonce: util.nonce()
    }, params)
    params.oauth_signature = sign('HMAC-SHA1', method, url, params, consumerSecret, secret || tokenSecret)

    return util.request(url, method, params)
  }
}

/**
 * Exports
 */

module.exports = initialize
