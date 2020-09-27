import {AsyncStorage} from 'react-native'
import {call, put, takeLatest, all} from 'redux-saga/effects'
import {createAction} from '@reduxjs/toolkit'
import {algorithm} from '../api/algorithm'

/* *
 * Constants
 * */
export const moduleName = 'algorithms'
const prefix = `${moduleName}`

export const START = `${prefix}/START`
export const SUCCESS = `${prefix}/SUCCESS`
export const ERROR = `${prefix}/ERROR`
export const HIDE_ERROR = `${prefix}/HIDE_ERROR`

/* *
 * Reducer
 * */

/* *
 * Selectors
 * */

/* *
 * Action Creators
 * */
export const putAlgorithmStart = createAction(START)
export const putAlgorithmSuccess = createAction(SUCCESS)
export const putAlgorithmError = createAction(ERROR)
export const hideError = createAction(HIDE_ERROR)

/* *
 * Sagas
 * */
export function* putAlgorithmSaga({type, payload}) {
  try {
    const userId = yield AsyncStorage.getItem('userId')
    const tokenId = yield AsyncStorage.getItem('tokenId')

    const request = yield call(algorithm, {name: payload, userId, tokenId})

    if (!request.ok) {
      const error = {}
      error.message = 'Something went wrong!'
      throw error
    }

    yield put(putAlgorithmSuccess(payload))
  } catch (error) {
    return yield put(putAlgorithmError({error: error.message}))
  }
}

export const saga = [
  function* saga() {
    yield all([takeLatest(START, putAlgorithmSaga)])
  },
]
