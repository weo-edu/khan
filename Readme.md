# khan

Khan academy API wrapper

## Installation

`npm install khan`

## Usage

This package exports two top-level properties, the first is `oauth`, and it contains two methods:

### `oauth`

This portion provides some methods to help you with the authentication flow.

    * `getRequestToken(consumerKey)` - Returns a promise that resolves to either an error or a request token
    * `getAccessToken(consumerKey, requestToken)` - Returns a promise that resolves to either an error or an access token

#### Example

```javascript
var api = require('khan')

api.oauth
  .getRequestToken(consumerKey)
  .then(function (res) {
    // res = {oauth_token, oauth_token_secret}
    // where 'oauth_token' is your request token
    // you now need to have the user authorize it
    // from their browser
  })
```

```
var api = require('khan')

api.oauth
  .getAccessToken(consumerKey, requestToken, verifier)
  .then(function (res) {
    // res = {oauth_token, oauth_token_secret}
    // where, in this case, oauth_token is your access token
    // which you may now use to make authenticated requests
  })
```

### `khan`

The `khan` property is a function, that accepts up to three parameters:

  * `consumerKey` - your oauth application consumer key
  * `accessToken` - an oauth access token (such as one from getAccessToken above)
  * `verifier` - an oauth_verifier, which should have been obtained during the browser portion of the oauth flow

These parameters are completely optional.  If you want to use the API without authentication, you can just do this `khan = api.khan()`, and you will have access to all of the methods that don't require authentication.  If you do want to use authentication, pass in these parameters, and you'll get back an object map of curried methods that will make authenticated requests for you.  E.g.

```javascript
var khan = api.khan(consumerKey, accessToken, verifier)

khan
  .getUserExercise(exerciseName)
  .then(function (exercise) {
    // Do some stuff
  })
```

#### Methods

  * `getExercise(exerciseId)` - Retrieve data about an exercise. (unauthenticated)
  * `getUserExercise(exerciseId)` - Retrieve data about an exercise for the currently authenticated user.  (authenticated)