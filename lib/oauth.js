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

function getRequestToken (consumerKey) {
  return request(consumerKey)(requestTokenUrl, 'post')
    .then(function (res) {
      if (res.status !== 200) throw new Error(res.body || res.text)
      return res.body
    })
}

function getAccessToken (consumerKey, requestToken, verifier) {
  if (!requestToken) throw new Error('Request token is required')

  var params = {oauth_token: requestToken}
  if (verifier) params.oauth_verifier = verifier
  return request(consumerKey)(accessTokenUrl, 'post', params)
    .then(function (res) {
      if (res.status !== 200) throw new Error(res.body || res.text)
      return res.body
    })
}

/**
 * Exports
 */

module.exports = {
  getRequestToken: getRequestToken,
  getAccessToken: getAccessToken
}
