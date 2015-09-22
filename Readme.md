# khan

Khan academy API wrapper

## Installation

`npm install khan`

## Usage

This package exports a single, autocurried function.  This function takes up to 4 parameters:

* `consumerKey` - provided by Khan when you register your application
* `consumerSecret` - provided by Khan when you register your application
* `tokenSecret` (optional) - obtained when the user authorizes your application
* `accessToken` (optional) - obtained when the user authorizes your application


All of these are optional.  If you don't call the function, it is simply a map of unauthenticated requests you may make.  Because it is autocurried, you may continue calling it indefinitely with more parameters.  E.g. `khan(consumerKey)(consumerSecret)` is equivalent to `khan(consumerKey, consumerSecret)`, so you can nicely make partially applied versions of the wrapper for different contexts.  This pattern in particular is useful:

```javascript
var khan = require('khan')(consumerKey, consumerSecret)

function getExercises (user, exerciseName) {
  var userKhan = khan(user.khan.oauth_token_secret, user.khan.oauth_token)
  return userKhan.userExercise(exerciseName)
}
```

## Methods

These methods are properties on `khan` (or any curried instance of khan).  Unless otherwise specified, they all return promises:

  * `request(apiPath)`

     - this is a special method that allows you to request any arbitrary path of the khan api. If you call `request(/somepath)`, it will send a (signed if authenticated) request to `https://www.khanacademy.org/api/v1/api/v1/somepath`.

  * `badges()`
  * `badgeCategories()`
  * `badgeCategoryRange(category)`
  * `exercise(exerciseName)`
  * `exerciseFollowups(exerciseName)`
  * `exerciseVideos(exerciseName)`
  * `playlistVideos(pathTopicSlug)`
  * `playlistExercises(pathTopicSlug)`
  * `topic(topicSlug)`
  * `topicExercises(topicSlug)`
  * `topicVideos(topicSlug)`
  * `user()` (auth required)
  * `userExercies()` (auth required)
  * `userExercise(exerciseName)` (auth required)
  * `userExerciseFollowups(exerciseName)` (auth required)
  * `userExerciseLog(exerciseName)` (auth required)
  * `userProgressChanges()`(auth required)
  * `userPlaylists()` (auth required)
  * `userVideos()` (auth required)
  * `userVideo(videoId)` (auth required)
  * `userVideoLog()` (auth required)
  * `students()` (auth required)
  * `video(videoId)`
  * `videoExercises(videoId)`

### requestToken

Params:

  * `redirectUri` (optional) - Where the user should get redirected after they authorize

#### Example - Getting a request token

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


### accessToken

Retrieve an access token.

Params:

  * `requestToken` - The request token you received in the previous request
  * `verifier` - The oauth verifier returned by the authorize step
  * `tokenSecret` - the token secret you received in te previous request

#### Example - Getting an access token

```
var khan = require('khan')(consumerKey, consumerSecret)

khan
  .accessToken(requestToken, verifier, tokenSecret)
  .then(function (res) {
    // res = {oauth_token, oauth_token_secret}
    // where, in this case, oauth_token is your access token
    // which you may now use to make authenticated requests
  })
```

### exercise

Retrieve public data about a particular exercise.

Params:

  * `exerciseName` - Exercise name

#### Example - Retrieving data about an exercise

This is a completely public request, so it doesn't require any auth parameters:

```javascript
var khan = require('khan')

function getExercise(name) {
  return khan.exercise(name)
}
```

### userExercise

Retrieve a user's state on a particular exercise.

Params:

  * `exerciseName` - Exercise name
  * `userId` (optional) - User id.  If not passed, retrieves data for the currently authenticated user.

#### Example - Getting exercise data for a particular user

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
