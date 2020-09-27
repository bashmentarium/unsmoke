import {call, put, takeLatest, all} from 'redux-saga/effects'
import {createAction} from '@reduxjs/toolkit'
import {SIGN_OUT} from './login'
import {COMPLETE_SUCCESS, UNLOCK_ACHIEVEMENT, MARK_AS_READ} from './exercises'
import {SUCCESS as ALGORITHM_SUCCESS} from './algorithms'
import {ENTRY_SUCCESS, DELETE_SUCCESS} from './diaryEntry'
import {SUCCESS as ANSWER_SUCCESS} from './question'
import {SUCCESS as QUESTIONNAIRE_SUCCESS} from './questionnaire'
import {CHAPTER_SUCCESS} from './unlock'
import {SUCCESS as COUNTER_START} from './counter'
import {RESET as COUNTER_RESET} from './counter'
import {getUserData, wipeProgress} from '../api/userData'
import {allExercises} from '../constants/nice'
import initialUserProfile from '../utils/initialUserProfile.json'
import {AsyncStorage} from 'react-native'

/* *
 * Constants
 * */
export const moduleName = 'userData'
const prefix = `${moduleName}`

export const START = `${prefix}/START`
export const SUCCESS = `${prefix}/SUCCESS`
export const ERROR = `${prefix}/ERROR`
export const WIPE_PROGRESS_SUCCESS = `${prefix}/WIPE_PROGRESS_SUCCESS`

/* *
 * Reducer
 * */
export const initialState = {
  loading: false,
  success: false,
  error: null,
}

export default function reducer(
  state = initialState,
  {type, payload, ...rest}
) {
  switch (type) {
    case START:
      return {
        loading: true,
        success: false,
        error: null,
      }
    case SUCCESS:
      return {
        loading: false,
        success: payload,
        error: null,
      }
    case ERROR:
      return {
        loading: false,
        success: false,
        error: payload,
      }
    case SIGN_OUT:
      return {
        loading: false,
        success: false,
        error: null,
      }
    case ANSWER_SUCCESS:
      return {
        ...state,
        success: {
          ...state.success,
          answeredQuestions: {
            ...state.success.answeredQuestions,
            [payload.questionId]: payload.optionId,
          },
        },
      }
    case QUESTIONNAIRE_SUCCESS:
      return {
        ...state,
        success: {
          ...state.success,
          completeQuestionnaires: {
            ...state.success.completeQuestionnaires,
            [payload]: true,
          },
        },
      }
    case COMPLETE_SUCCESS:
      return {
        ...state,
        success: {
          ...state.success,
          currentExercise: payload,
        },
      }
    case CHAPTER_SUCCESS:
      return {
        ...state,
        success: {
          ...state.success,
          currentChapter: payload,
        },
      }
    case UNLOCK_ACHIEVEMENT:
      return {
        ...state,
        success: {
          ...state.success,
          unreadAchievementsAmount: payload.unreadAchievementsAmount,
          unlockedAchievements: [...payload.unlockedAchievements],
        },
      }
    case MARK_AS_READ:
      return {
        ...state,
        success: {
          ...state.success,
          unreadAchievementsAmount: 0,
        },
      }
    case ALGORITHM_SUCCESS:
      return {
        ...state,
        success: {
          ...state.success,
          [payload]: true,
        },
      }
    case ENTRY_SUCCESS:
      return {
        ...state,
        success: {
          ...state.success,
          diaryEntries: {
            ...state.success.diaryEntries,
            [payload.id]: {
              ...payload,
            },
          },
        },
      }
    case COUNTER_START:
      return {
        ...state,
        success: {
          ...state.success,
          startCounterDate: {
            date: payload.date,
            values: payload.values,
          },
        },
      }
    case COUNTER_RESET:
      const {
        startCounterDate: variableIwillNeverUse2,
        ...otherProperties2
      } = state.success
      return {
        ...state,
        success: {
          ...otherProperties2,
        },
      }
    case DELETE_SUCCESS:
      const {
        [payload]: variableIwillNeverUse,
        ...otherProperties
      } = state.success.diaryEntries
      return {
        ...state,
        success: {
          ...state.success,
          diaryEntries: {
            ...otherProperties,
          },
        },
      }
    case WIPE_PROGRESS_SUCCESS:
      return {
        loading: false,
        success: initialUserProfile,
        error: null,
      }
    default:
      return state
  }
}

/* *
 * Selectors
 * */
export const userDataSelector = (state) => state.userData.success

export const showProfit = (state) => {
  const currentExercise = state.userData.success.currentExercise

  if (
    allExercises.indexOf(currentExercise) >
    allExercises.indexOf('r3jsltv8hmv2v')
  ) {
    return true
  } else if (currentExercise === 'asdasd') {
    return true
  } else {
    return false
  }
}

/* *
 * Action Creators
 * */
export const userDataStart = createAction(START)
export const userDataSuccess = createAction(SUCCESS)
export const userDataError = createAction(ERROR)
export const wipeProgressSuccess = createAction(WIPE_PROGRESS_SUCCESS)

/* *
 * Sagas
 * */
export function* userDataSaga() {
  try {
    const userId = yield AsyncStorage.getItem('userId')
    const token = yield AsyncStorage.getItem('tokenId')

    const request = yield call(getUserData, {tokenId: token, userId: userId})

    if (!request) {
      const error = {}
      error.message = 'Something'

      throw error
    }

    return yield put(userDataSuccess(request))
  } catch (error) {
    return yield put(userDataError(error.message))
  }
}

export function* wipeProgressSaga() {
  try {
    const userId = yield AsyncStorage.getItem('userId')
    const token = yield AsyncStorage.getItem('tokenId')

    const request = yield call(wipeProgress, {
      tokenId: token,
      userId: userId,
    })
    if (!request) {
      const error = {}
      error.message = 'Something'

      throw error
    }

    return yield put(wipeProgressSuccess)
  } catch (error) {
    return error
  }
}

export const saga = [
  function* saga() {
    yield all([
      takeLatest(START, userDataSaga),
      takeLatest(WIPE_PROGRESS_SUCCESS, wipeProgressSaga),
    ])
  },
]
