/**
 * Imports
 */

var sign = require('oauth-sign')
var util = require('./util')
var assign = require('object-assign')

/**
 * OAuth requests
 */

function initialize (consumerKey, consumerSecret, accessToken, tokenSecret) {
  if (!consumerKey) throw new Error('Consumer key is required')
  if (!consumerSecret) throw new Error('Consumer secret is required')
  if (accessToken && !tokenSecret) throw new Error('Token secret required if using access token')

  var defaults = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: util.nonce(),
    oauth_version: '1.0',
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: util.timestamp()
  }

  if (accessToken) {
    defaults.oauth_token = accessToken
  }

  return function (url, method, params) {
    if (arguments.length === 2) {
      params = method
      method = 'get'
    }

    params = assign({}, defaults, params)
    params.oauth_signature = sign(method, url, params, consumerSecret, tokenSecret)
    return util.request(url, method, params)
  }
}

/**
 * Exports
 */

module.exports = initialize
