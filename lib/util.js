/**
 * Imports
 */

var superagent = require('superagent')
var superagentAsPromised = require('superagent-as-promised')

/**
 * Vars
 */

var request = superagentAsPromised(superagent)

/**
 * Utilities
 */

function stringify (params) {
  return Object
    .keys(params)
    .map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    })
    .join('&')
}

function nonce () {
  return Math.round(Math.random() * Math.pow(10, 12))
}

function timestamp () {
  return Math.floor((+new Date()) / 1000)
}

function curryAll (obj /*, args... */) {
  var args = [].slice.call(arguments).slice(1)

  return Object
    .keys(obj)
    .reduce(function (memo, key) {
      var val = obj[key]
      if (typeof val === 'function') {
        val = val.bind.apply(val, [null].concat(args))
      }

      memo[key] = val
      return memo
    }, {})
}

function makeRequest (url, method, params) {
  if (arguments.length === 2) {
    params = method
    method = 'get'
  }

  if (method.toLowerCase() === 'get') {
    return request.get(url + '?' + stringify(params))
  }

  return request[method](url)
    .send(stringify(params))
}

/**
 * Exports
 */

module.exports = {
  timestamp: timestamp,
  nonce: nonce,
  stringify: stringify,
  request: makeRequest
}
