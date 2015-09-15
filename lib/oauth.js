/**
 * Imports
 */

var util = require('./util')

/**
 * Vars
 */

var requestTokenUrl = 'https://www.khanacademy.org/api/auth2/request_token'
var accessTokenUrl = 'https://www.khanacademy.org/api/auth2/access_token'

/**
 * OAuth Wrapper
 */

function requestToken (request, redirectUri) {
  return request(requestTokenUrl, {
    oauth_callback: redirectUri
  }, 'post').then(util.handleResponse)
}

function accessToken (request, requestToken, verifier, secret) {
  if (!requestToken) throw new Error('Request token is required')

  return request(accessTokenUrl, {
    oauth_token: requestToken,
    oauth_verifier: verifier
  }, 'post', secret).then(util.handleResponse)
}

/**
 * Exports
 */

module.exports = {
  requestToken: requestToken,
  accessToken: accessToken
}
