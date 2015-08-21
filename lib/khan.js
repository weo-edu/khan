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

function exercise (request, exerciseName) {
  return request(urls.exercise + exerciseName)
}

function userExercise (request, exerciseName) {
  return request(urls.userExercise + exerciseName)
}

/**
 * Exports
 */

module.exports = {
  exercise: exercise,
  userExercise: userExercise
}
