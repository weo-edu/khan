/**
 * Imports
 */

var request = require('./oauth-request')

/**
 * Vars
 */

var requestTokenUrl = 'https://www.khanacademy.org/api/auth2/request_token'
var accessTokenUrl = 'https://www.khanacademy.org/api/auth2/access_token'

/**
 * OAuth Wrapper
 */

function requestToken (request, redirectUri) {
  var params = {}
  if (redirectUri) params.oauth_callback = redirectUri

  return request(requestTokenUrl, 'post', params).then(handle)
}

function accessToken (requestToken, verifier) {
  if (!requestToken) throw new Error('Request token is required')

  var params = {oauth_token: requestToken}
  if (verifier) params.oauth_verifier = verifier

  return request(accessTokenUrl, 'post', params).then(handle)
}

/**
 * Helpers
 */

function handle (res) {
  if (res.status !== 200) throw new Error(res.body || res.text)
  return res.body
}

/**
 * Exports
 */

module.exports = {
  requestToken: requestToken,
  accessToken: accessToken
}
