/**
 * Imports
 */

var omap = require('object.map')
var oauth = require('./oauth')
var oauthRequest = require('./oauth-request')
var khan = require('./khan')
var util = require('./util')

/**
 * Wrapper
 */

function khan (consumerKey, consumerSecret, accessToken, tokenSecret) {
  var args = [].slice.call(arguments)
  return decorate(khan.bind.apply(khan, [null].concat(args)), args)
}

function decorate (o, args) {
  return util.extend(o, bind(oauth, args), bind(khan, args))
}

function bind (fns, args) {
  return omap(fns, function (fn) {
    var request = args
      ? oauthRequest.apply(null, args)
      : util.request

    return fn.bind(null, request)
  })
}

/**
 * Exports
 */

module.exports = decorate(khan)