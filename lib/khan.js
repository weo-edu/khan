/**
 * Imports
 */

var util = require('./util')

/**
 * Vars
 */

var urls = {
  badge: 'https://www.khanacademy.org/api/v1/badges/',
  exercise: 'https://www.khanacademy.org/api/v1/exercises/',
  user: 'https://www.khanacademy.org/api/v1/user/exercises/',
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
 * User Exercises
 */

function userExercise (request, exerciseName) {
  return request(urls.user + exerciseName).then(util.handleResponse)
}

function userExerciseFollowups (request, exerciseName) {
  return request(urls.user + exerciseName + '/followup_exercises').then(util.handleResponse)
}

function userExerciseLog (request, exerciseName) {
  return request(urls.user + exerciseName + '/log').then(util.handleResponse)
}

function userProgressChanges (request) {
  return request(urls.user + 'progress_changes').then(util.handleResponse)
}

function userPlaylists (request) {
  return request(urls.user + 'playlists').then(util.handleResponse)
}

function userVideos (request) {
  return request(urls.user + 'videos').then(util.handleResponse)
}

function userVideo (request, videoId) {
  return request(urls.user + 'videos/' + videoId).then(util.handleResponse)
}

function userVideoLog (request, videoId) {
  return request(urls.user + 'videos/' + videoId + '/log').then(util.handleResponse)
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
