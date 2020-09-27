import {call, put, takeLatest, all} from 'redux-saga/effects'
import {createAction} from '@reduxjs/toolkit'
import {AsyncStorage} from 'react-native'

import {signUp} from '../api/signUp'
import {loginSuccess} from './login'
import {delay, SUCCESS} from './common'
import {userDataStart} from './userData'
import initialUserProfile from '../utils/initialUserProfile.json'

/* *
 * Constants
 * */
export const moduleName = 'signUp'
const prefix = `${moduleName}`

export const START = `${prefix}/START`
export const ERROR = `${prefix}/ERROR`
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
        success: true,
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
export const signUpSelector = (state) => state.signUp

/* *
 * Action Creators
 * */
export const signUpStart = createAction(START)
export const signUpSuccess = createAction(SUCCESS)
export const signUpError = createAction(ERROR)
export const hideError = createAction(HIDE_ERROR)
/* *
 * Sagas
 * */
export function* signUpSaga({type, payload}) {
  try {
    const request = yield call(signUp, {...payload})
    const response = yield request.json()
    if (!request.ok) {
      const error = {}
      const errorId = response.error.message
      error.message = 'Something went wrong!'
      if (errorId === 'EMAIL_EXISTS') {
        error.message = 'This email exists already!'
      }
      throw error
    }

    yield put(
      signUpSuccess({userId: response.localId, token: response.idToken})
    )

    const expirationDate = new Date(
      new Date().getTime() + parseInt(response.expiresIn) * 1000
    )

    yield fetch(
      `https://unsmoke-app.firebaseio.com/users.json?auth=${response.idToken}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          [response.localId]: initialUserProfile,
        }),
      }
    )

    if (response.localId) {
      yield AsyncStorage.setItem('userId', response.localId)
    }
    if (response.idToken) {
      yield AsyncStorage.setItem('tokenId', response.idToken)
    }
    if (response.expiresIn) {
      yield AsyncStorage.setItem('expiryDate', expirationDate.toLocaleString())
    }
    if (response.refreshToken) {
      yield AsyncStorage.setItem('refreshToken', response.refreshToken)
    }

    yield put(loginSuccess({userId: response.localId, token: response.idToken}))

    yield put(
      userDataStart({userId: response.localId, token: response.idToken})
    )
  } catch (error) {
    console.log(error)
    return yield put(signUpError({error: error.message}))
  }
}

export function* signUpErrorSaga() {
  yield delay(5000)
  yield put(hideError())
}

export const saga = [
  function* saga() {
    yield all([
      takeLatest(START, signUpSaga),
      takeLatest(ERROR, signUpErrorSaga),
    ])
  },
]
