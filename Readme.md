# khan

Khan academy API wrapper

## Installation

`npm install khan`

## Usage

This package exports two top-level properties, `oauth` and `khan`.  `oauth` providers helpers for the OAuth flow, and `khan` wraps some of the actual khan api endpoints.  Both properties are functions that take the following arguments:

* `consumerKey` - provided by Khan when you register your application
* `consumerSecret` - provided by Khan when you register your application
* `accessToken` (optional) - obtained when the user authorizes your application
* `tokenSecret` (optional) - obtained when the user authorizes your application (required if using `accessToken`)

All of these are optional.  If you pass nothing e.g. `api = require('khan').khan()`, you will only be able to make unauthenticated requests.

### `oauth`

`oauth` returns an object containing two functions:

    * `getRequestToken()` - Returns a promise that resolves to either an error or a request token
    * `getAccessToken(requestToken)` - Returns a promise that resolves to either an error or an access token

#### Example

```javascript
var oauth = require('khan').oauth(consumerKey, consumerSecret)

oauth
  .getRequestToken()
  .then(function (res) {
    // res = {oauth_token, oauth_token_secret}
    // where 'oauth_token' is your request token
    // you now need to have the user authorize it
    // from their browser
  })
```

```
var oauth = require('khan').oauth(consumerKey, consumerSecret)

oauth
  .getAccessToken(requestToken, verifier)
  .then(function (res) {
    // res = {oauth_token, oauth_token_secret}
    // where, in this case, oauth_token is your access token
    // which you may now use to make authenticated requests
  })
```

### `khan`

#### Methods

  * `getExercise(exerciseId)` - Retrieve data about an exercise. (unauthenticated)
  * `getUserExercise(exerciseId)` - Retrieve data about an exercise for the currently authenticated user.  (authenticated)

E.g.

```javascript
var khan = api.khan(consumerKey, consumerSecret, accessToken, tokenSecret)

khan
  .getUserExercise(exerciseName)
  .then(function (exercise) {
    // Do some stuff
  })
```