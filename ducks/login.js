import {AsyncStorage} from 'react-native'
import {call, put, takeLatest, takeEvery, all} from 'redux-saga/effects'
import {createAction} from '@reduxjs/toolkit'
import {login} from '../api/login'
import {delay} from './common'
import {userDataStart} from './userData'
import {SUCCESS as SIGNUP_SUCCESS} from './common'
import NavigationService from '../utils/navigationService'

/* *
 * Constants
 * */
export const moduleName = 'login'
const prefix = `${moduleName}`

export const START = `${prefix}/START`
export const SUCCESS = `${prefix}/SUCCESS`
export const ERROR = `${prefix}/ERROR`
export const HIDE_ERROR = `${prefix}/HIDE_ERROR`
export const AUTO_LOGIN = `${prefix}/AUTO_LOGIN`
export const SIGN_OUT = `${prefix}/SIGN_OUT`

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
    case SIGNUP_SUCCESS:
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
    case SIGN_OUT:
      return {
        ...state,
        success: false,
      }
    default:
      return state
  }
}

/* *
 * Selectors
 * */
export const loginSelector = (state) => state.login

/* *
 * Action Creators
 * */
export const loginStart = createAction(START)
export const loginSuccess = createAction(SUCCESS)
export const loginError = createAction(ERROR)
export const hideError = createAction(HIDE_ERROR)
export const autoLogin = createAction(AUTO_LOGIN)
export const signOut = createAction(SIGN_OUT)

/* *
 * Sagas
 * */
export function* loginSaga({type, payload}) {
  try {
    const request = yield call(login, {...payload})
    const response = yield request.json()

    if (!request.ok) {
      const errorId = response.error.message
      const error = {}
      error.message = 'Something went wrong!'
      if (errorId === 'EMAIL_NOT_FOUND') {
        error.message = 'Username or password is incorrect'
      } else if (errorId === 'INVALID_PASSWORD') {
        error.message = 'Username or password is incorrect'
      }
      throw error
    }

    yield put(loginSuccess({token: response.idToken, userId: response.localId}))

    const expirationDate = new Date(
      new Date().getTime() + parseInt(response.expiresIn) * 1000
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

    yield put(userDataStart())
  } catch (error) {
    return yield put(loginError({error: error.message}))
  }
}

export function* loginErrorSaga() {
  yield delay(5000)
  yield put(hideError())
}

export function* autoLoginSaga() {
  const userId = yield AsyncStorage.getItem('userId')
  const tokenId = yield AsyncStorage.getItem('tokenId')
  const expiryDate = yield AsyncStorage.getItem('expiryDate')

  if (!expiryDate || !tokenId || !userId) {
    NavigationService.navigate('Intro')
    return
  }

  yield put(loginSuccess({token: tokenId, userId: userId}))

  yield put(userDataStart())

  NavigationService.navigate('Exercises')
}

export function* signOutSaga() {
  yield AsyncStorage.removeItem('userId')
  yield AsyncStorage.removeItem('tokenId')
  yield AsyncStorage.removeItem('expiryDate')
  yield AsyncStorage.removeItem('refreshToken')
  yield put(signOut)
  yield NavigationService.navigate('Auth')
}

export const saga = [
  function* saga() {
    yield all([
      takeLatest(START, loginSaga),
      takeLatest(ERROR, loginErrorSaga),
      takeLatest(AUTO_LOGIN, autoLoginSaga),
      takeLatest(SIGN_OUT, signOutSaga),
    ])
  },
]
