import {AsyncStorage} from 'react-native'
import {call, put, takeLatest, all} from 'redux-saga/effects'
import {createAction} from '@reduxjs/toolkit'
import {startCounter, stopCounter} from '../api/counter'

/* *
 * Constants
 * */
export const moduleName = 'counter'
const prefix = `${moduleName}`

export const START = `${prefix}/START`
export const SUCCESS = `${prefix}/SUCCESS`
export const ERROR = `${prefix}/ERROR`
export const RESET = `${prefix}/RESET`
export const HIDE_ERROR = `${prefix}/HIDE_ERROR`

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
        error: payload.error,
      }
    case HIDE_ERROR:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

/* *
 * Selectors
 * */
export const dateLaunchedSelector = (state) => {
  if (state.userData.success.startCounterDate) {
    return state.userData.success.startCounterDate.date
  } else {
    return null
  }
}

export const counterValuesSelector = (state) => {
  if (state.userData.success.startCounterDate) {
    return state.userData.success.startCounterDate.values
  } else {
    return {
      price: 0,
      amount: 0,
    }
  }
}

/* *
 * Action Creators
 * */
export const counterStart = createAction(START)
export const counterSuccess = createAction(SUCCESS)
export const counterError = createAction(ERROR)
export const counterReset = createAction(RESET)

/* *
 * Sagas
 * */
export function* counterStartSaga({type, payload}) {
  try {
    const userId = yield AsyncStorage.getItem('userId')
    const token = yield AsyncStorage.getItem('tokenId')

    const request = yield call(startCounter, {date: payload, userId, token})

    yield put(counterSuccess(payload))
  } catch (error) {
    return yield put(counterError({error: error.message}))
  }
}

export function* counterResetSaga({type, payload}) {
  try {
    const userId = yield AsyncStorage.getItem('userId')
    const token = yield AsyncStorage.getItem('tokenId')

    const request = yield call(stopCounter, {userId, token})

    yield put(counterReset)
  } catch (error) {
    return yield put(counterError({error: error.message}))
  }
}

export const saga = [
  function* saga() {
    yield all([
      takeLatest(START, counterStartSaga),
      takeLatest(RESET, counterResetSaga),
    ])
  },
]
