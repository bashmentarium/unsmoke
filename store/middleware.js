import {EXERCISE_SUCCESS, CHAPTER_SUCCESS} from '../ducks/unlock'
import {AUTO_LOGIN} from '../ducks/login'
import {SUCCESS as ALGORITHM_SUCCESS} from '../ducks/algorithms'
import {SUCCESS as COUNTER_SUCCESS, RESET} from '../ducks/counter'
import {ENTRY_SUCCESS, DELETE_SUCCESS} from '../ducks/diaryEntry'
import {
  COMPLETE_SUCCESS,
  UNLOCK_ACHIEVEMENT,
  MARK_AS_READ,
} from '../ducks/exercises'
import {SUCCESS as QUESTION_SUCCESS} from '../ducks/question'
import {SUCCESS as QUESTIONNAIRE_SUCCESS} from '../ducks/questionnaire'
import {SUCCESS as USER_DATA_SUCCESS} from '../ducks/userData'
import {setStorage, getStorage} from '../utils/setStorage'
import {refreshToken as refreshTkn} from '../api/login'

const customMiddleWare = (store) => (next) => async (action) => {
  if (
    [
      EXERCISE_SUCCESS,
      ALGORITHM_SUCCESS,
      COUNTER_SUCCESS,
      RESET,
      ENTRY_SUCCESS,
      DELETE_SUCCESS,
      COMPLETE_SUCCESS,
      UNLOCK_ACHIEVEMENT,
      MARK_AS_READ,
      QUESTION_SUCCESS,
      QUESTIONNAIRE_SUCCESS,
      USER_DATA_SUCCESS,
      CHAPTER_SUCCESS,
      AUTO_LOGIN,
    ].includes(action.type)
  ) {
    const asd = await getStorage()

    const expired = new Date(asd.expiryDate) - new Date() < 300000

    if (expired) {
      const request = await refreshTkn(asd.refreshToken)

      const response = await request.json()

      await setStorage(response)

      return
    }
  }
  next(action)
}

export default customMiddleWare
