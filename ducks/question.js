import {AsyncStorage} from 'react-native'
import {call, put, takeLatest, all} from 'redux-saga/effects'
import {createAction} from '@reduxjs/toolkit'
import {setAnswer} from '../api/question'
import fixtures from '../fixtures'

/* *
 * Constants
 * */
export const moduleName = 'question'
const prefix = `${moduleName}/Answer`

export const START = `${prefix}/START`
export const SUCCESS = `${prefix}/SUCCESS`
export const ERROR = `${prefix}/ERROR`

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
        success: true,
        error: null,
      }
    case ERROR:
      return {
        loading: false,
        success: false,
        error: payload.error,
      }
    default:
      return state
  }
}

/* *
 * Selectors
 * */
export const selectedAnswerId = (state, ownProps) => {
  if (state.userData.success.answeredQuestions) {
    return state.userData.success.answeredQuestions[ownProps.question.id]
  } else {
    return undefined
  }
}

export const questionsByQuestionnairesId = (state, ownProps) => {
  return state.questions.allIds
    .map((id) => state.questions.byId[id])
    .filter((question) => question.questionnaireId === ownProps.id)
}

function getQuestions() {
  const allQuestions = fixtures
    .map((f) =>
      f.exercises.map((exercise) => exercise.questionnaires || []).flat()
    )
    .flat()
    .map((questionnaire) =>
      questionnaire.questions
        ? questionnaire.questions.map((q) => ({
            ...q,
            questionnaireId: questionnaire.id,
          }))
        : []
    )
    .flat()
  const allIds = allQuestions.map((q) => q.id)
  const byId = allQuestions.reduce((acc, q) => {
    acc[q.id] = q
    return acc
  }, {})
  return {allIds, byId}
}

export const questions = (state = getQuestions(), {}) => {
  return state
}

/* *
 * Action Creators
 * */
export const answerStart = createAction(START)
export const answerSuccess = createAction(SUCCESS)
export const answerError = createAction(ERROR)

/* *
 * Sagas
 * */
export function* setAnswerSaga({type, payload}) {
  const userId = yield AsyncStorage.getItem('userId')
  const tokenId = yield AsyncStorage.getItem('tokenId')
  try {
    const request = yield call(setAnswer, {...payload, userId, tokenId})

    yield put(answerSuccess(payload))
  } catch (error) {
    yield put(answerError({error: error.message}))
  }
}

export const saga = [
  function* saga() {
    yield all([takeLatest(START, setAnswerSaga)])
  },
]
