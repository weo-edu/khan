/**
 * Vars
 */

var urls = {
  exercise: 'https://www.khanacademy.org/api/exercises/',
  userExercise: 'https://www.khanacademy.org/api/user/exercises/'
}

/**
 * Khan API Wrapper
 */

function getExercise (request, exerciseName) {
  return request(urls.exercise + exerciseName)
}

function getUserExercise (request, exerciseName) {
  return request(urls.userExercise + exerciseName)
}

/**
 * Exports
 */

module.exports = {
  getExercise: getExercise,
  getUserExercise: getUserExercise
}
