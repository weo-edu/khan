/**
 * Imports
 */

var util = require('./util')

/**
 * Vars
 */
var userURL = 'https://www.khanacademy.org/api/v1/user'

var urls = {
  badge: 'https://www.khanacademy.org/api/v1/badges/',
  exercise: 'https://www.khanacademy.org/api/v1/exercises/',
  user: userURL,
  userExercises: userURL + '/exercises/',
  playlist: 'https://www.khanacademy.org/api/v1/playlists/',
  topic: 'https://www.khanacademy.org/api/v1/topic/',
  videos: 'https://www.khanacademy.org/api/v1/videos/'
}

/**
 * Khan API Wrapper
 */

/**
 * Badges
 */

function badges (request) {
  return request(urls.badge.slice(0, -1)).then(util.handleResponse)
}

function badgeCategories (request) {
  return request(urls.badge + 'categories').then(util.handleResponse)
}

function badgeCategoryRange (request, category) {
  return request(urls.badge + 'categories/' + category).then(util.handleResponse)
}

/**
 * Exercises
 */

function exercise (request, exerciseName) {
  return request(urls.exercise + exerciseName).then(util.handleResponse)
}

function exerciseFollowups (request, exerciseName) {
  return request(urls.exercise + exerciseName + '/followup_exercises').then(util.handleResponse)
}

function exerciseVideos (request, exerciseName) {
  return request(urls.exercise + exerciseName + '/videos').then(util.handleResponse)
}

/**
 * Playlists
 */

function playlistVideos (request, pathTopicSlug) {
  return request(urls.playlist + pathTopicSlug + '/videos').then(util.handleResponse)
}

function playlistExercises (request, pathTopicSlug) {
  return request(urls.playlist + pathTopicSlug + '/exercises').then(util.handleResponse)
}

/**
 * Topics
 */

function topic (request, topicSlug) {
  return request(urls.topic + topicSlug).then(util.handleResponse)
}

function topicExercises (request, topicSlug) {
  return request(urls.topic + topicSlug).then(util.handleResponse)
}

function topicVideos (request, topicSlug) {
  return request(urls.topic + topicSlug).then(util.handleResponse)
}

/**
 * User
 */

function user (request) {
  return request(urls.user).then(util.handleResponse)
}

/**
 * User Exercises
 */

function userExercise (request, exerciseName) {
  return request(urls.userExercises + exerciseName).then(util.handleResponse)
}

function userExerciseFollowups (request, exerciseName) {
  return request(urls.userExercises + exerciseName + '/followup_exercises').then(util.handleResponse)
}

function userExerciseLog (request, exerciseName) {
  return request(urls.userExercises + exerciseName + '/log').then(util.handleResponse)
}

function userProgressChanges (request) {
  return request(urls.userExercises + 'progress_changes').then(util.handleResponse)
}

function userPlaylists (request) {
  return request(urls.userExercises + 'playlists').then(util.handleResponse)
}

function userVideos (request) {
  return request(urls.userExercises + 'videos').then(util.handleResponse)
}

function userVideo (request, videoId) {
  return request(urls.userExercises + 'videos/' + videoId).then(util.handleResponse)
}

function userVideoLog (request, videoId) {
  return request(urls.userExercises + 'videos/' + videoId + '/log').then(util.handleResponse)
}

/**
 * Videos
 */

function video (request, videoId) {
  return request(urls.video + videoId).then(util.handleResponse)
}

function videoExercises (request, videoId) {
  return request(urls.video + videoId).then(util.handleResponse)
}

/**
 * Exports
 */

module.exports = {
  // Badges
  badges: badges,
  badgeCategories: badgeCategories,
  badgeCategoryRange: badgeCategoryRange,

  // Exercises
  exercise: exercise,
  exerciseFollowups: exerciseFollowups,
  exerciseVideos: exerciseVideos,

  // Playlists
  playlistVideos: playlistVideos,
  playlistExercises: playlistExercises,

  // Topics
  topic: topic,
  topicExercises: topicExercises,
  topicVideos: topicVideos,

  // User
  user: user,
  userExercise: userExercise,
  userExerciseFollowups: userExerciseFollowups,
  userExerciseLog: userExerciseLog,
  userProgressChanges: userProgressChanges,
  userPlaylists: userPlaylists,
  userVideos: userVideos,
  userVideo: userVideo,
  userVideoLog: userVideoLog,

  // Videos
  video: video,
  videoExercises: videoExercises
}
