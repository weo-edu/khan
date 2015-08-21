# khan

Khan academy API wrapper

## Installation

`npm install khan`

## Usage

This package exports a single, autocurried function.  This function takes up to 4 parameters:

* `consumerKey` - provided by Khan when you register your application
* `consumerSecret` - provided by Khan when you register your application
* `accessToken` (optional) - obtained when the user authorizes your application
* `tokenSecret` (optional) - obtained when the user authorizes your application (required if using `accessToken`)

All of these are optional.  If you don't call the function, it is simply a map of unauthenticated requests you may make.

## Methods

These methods are properties on `khan` (or any curried instance of khan):

  * `requestToken(redirectUri)` - Returns a promise that resolves to either an error or a request token (requires consumer key/secret)
  * `accessToken(requestToken)` - Returns a promise that resolves to either an error or an access token (requires consumer key/secret)
  * `exercise(exerciseId)` - Retrieve data about an exercise. (unauthenticated)
  * `userExercise(exerciseId)` - Retrieve data about an exercise for the currently authenticated user.  (authenticated)


## Examples

### Getting a request token

```javascript
var khan = require('khan')(consumerKey, consumerSecret)

khan
  .requestToken()
  .then(function (res) {
    // res = {oauth_token, oauth_token_secret}
    // where 'oauth_token' is your request token
    // you now need to have the user authorize it
    // from their browser
  })
```

### Getting an access token

```
var khan = require('khan')(consumerKey, consumerSecret)

khan
  .accessToken(requestToken, verifier)
  .then(function (res) {
    // res = {oauth_token, oauth_token_secret}
    // where, in this case, oauth_token is your access token
    // which you may now use to make authenticated requests
  })
```

### Getting exercise data for a particular user

```javascript
var khan = require('khan')(consumerKey, consumerSecret)

function getUserExercise (user, exerciseName) {
  khan(user.oauth_token, user.oauth_token_secret)
    .getUserExercise(exerciseName)
    .then(function (exercise) {
      // Do some stuff
    })
}
```