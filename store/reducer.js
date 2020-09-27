import {combineReducers} from 'redux'
import login, {moduleName as loginReducer} from '../ducks/login'
import signUp, {moduleName as signUpReducer} from '../ducks/signUp'
import userData, {moduleName as userDataReducer} from '../ducks/userData'
import completeExercise, {
  moduleName as completeExerciseReducer,
  allExercises,
  allChapters,
} from '../ducks/exercises'
import newEntry from '../ducks/diaryEntry'
import {questionnaires} from '../ducks/questionnaires'
import {questions} from '../ducks/questions'

export default combineReducers({
  [loginReducer]: login,
  [signUpReducer]: signUp,
  [userDataReducer]: userData,
  [completeExerciseReducer]: completeExercise,
  allExercises: allExercises,
  allChapters: allChapters,
  newEntry,
  questionnaires,
  questions,
})
