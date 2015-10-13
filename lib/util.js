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

function parse (str) {
  return str
    .split('&')
    .reduce(function (memo, pair) {
      var parts = pair.split('=').map(decodeURIComponent)
      memo[parts[0]] = parts[1]
      return memo
    }, {})
}

function makeRequest (url, method, params) {
  if (arguments.length === 2) {
    params = method
    method = 'get'
  }

  if (method.toLowerCase() === 'get') {
    return request
      .get(url + '?' + stringify(params))
      .set('Accepts', 'application/json')
  }

  return request[method](url)
    .set('Accepts', 'application/json')
    .send(stringify(params))
}

function extend (target) {
  var args = [].slice.call(arguments).slice(1)

  args.forEach(function (o) {
    o && Object.keys(o).forEach(function (key) {
      if (o[key] !== undefined) {
        target[key] = o[key]
      }
    })
  })

  return target
}

function isEmpty (obj) {
  return obj && Object.keys(obj).length === 0 && !Array.isArray(obj)
}

function handleResponse (res) {
  if (res.status !== 200) throw new Error({code: res.status, message: res.text})
  return isEmpty(res.body)
    ? parse(res.text)
    : res.body
}

/**
 * Exports
 */

module.exports = {
  timestamp: timestamp,
  nonce: nonce,
  stringify: stringify,
  request: makeRequest,
  extend: extend,
  handleResponse: handleResponse
}
