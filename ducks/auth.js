import {AsyncStorage} from 'react-native'
import {createAction, createReducer} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import {apiKey, singUpKey} from '../utils/apiKey'
import initialUserProfile from '../utils/initialUserProfile'

// Types
export const signUpStart = createAction('SIGN_UP_START')
export const signUpSuccess = createAction('SIGN_UP_SUCCESS')
export const signUpFail = createAction('SIGN_UP_FAIL')
export const hideSignUpFail = createAction('HIDE_SIGN_UP_FAIL')

export const loginStart = createAction('LOGIN_START')
export const loginSuccess = createAction('LOGIN_SUCCESS')
export const loginFail = createAction('LOGIN_FAIL')
export const hideLoginFail = createAction('HIDE_LOGIN_FAIL')

export const SIGN_OUT = 'SIGN_OUT'

// Action creators
export const authenticate = (userId, token) => {
  return {type: loginSuccess, userId: userId, token: token}
}

export const signup = (authData) => {
  return async (dispatch) => {
    dispatch({type: signUpStart})

    const response = await fetch(apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }),
    })
    if (!response.ok) {
      const errorResData = await response.json()
      const errorId = errorResData.error.message
      let message = 'Something went wrong!'
      if (errorId === 'EMAIL_EXISTS') {
        message =
          "This email exists already! If you forgot your password, use the 'forgot password' functionality"
      }
      dispatch({type: signUpFail, payload: message})
      setTimeout(() => {
        dispatch({type: hideSignUpFail})
      }, 5000)
      throw new Error(message)
    }

    const resData = await response.json()

    dispatch({
      type: signUpSuccess,
      token: resData.idToken,
      userId: resData.localId,
    })

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    )

    if (resData.localId) {
      await AsyncStorage.setItem('userId', resData.localId)
    }
    if (resData.idToken) {
      await AsyncStorage.setItem('tokenId', resData.idToken)
    }
    if (resData.expiresIn) {
      await AsyncStorage.setItem('expiryDate', JSON.stringify(expirationDate))
    }

    await fetch(
      `https://unsmoke-app.firebaseio.com/users.json?auth=${resData.idToken}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          [resData.localId]: initialUserProfile,
        }),
      }
    )
  }
}

export const login = (authData) => {
  let message
  return async (dispatch) => {
    dispatch(loginStart())

    const response = await fetch(singUpKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }),
    })
    if (!response.ok) {
      const errorResData = await response.json()
      const errorId = errorResData.error.message
      message = 'Something went wrong!'
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'Username or password is incorrect'
        dispatch({type: loginFail, payload: message})
        setTimeout(() => {
          dispatch({type: hideLoginFail})
        }, 5000)
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'Username or password is incorrect'
        dispatch({type: loginFail, payload: message})
        setTimeout(() => {
          dispatch({type: hideLoginFail})
        }, 5000)
      }

      throw new Error(message)
    }
    const resData = await response.json()

    dispatch(loginSuccess({token: resData.idToken, userId: resData.localId}))

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    )

    if (resData.localId) {
      await AsyncStorage.setItem('userId', resData.localId)
    }
    if (resData.idToken) {
      await AsyncStorage.setItem('tokenId', resData.idToken)
    }
    if (resData.expiresIn) {
      await AsyncStorage.setItem('expiryDate', expirationDate)
    }
  }
}

export const signOut = () => {
  return async (dispatch) => {
    dispatch({type: SIGN_OUT})
    await AsyncStorage.removeItem('userId')
    await AsyncStorage.removeItem('tokenId')
    await AsyncStorage.removeItem('expiryDate')
  }
}

// Reducers
const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case loginSuccess:
      return true
    case loginFail:
      return false
    case signUpSuccess:
      return true
    case signUpFail:
      return false
    case hideSignUpFail:
      return false
    case SIGN_OUT:
      return false
    default:
      return state
  }
}

const loginError = (state = false, action) => {
  switch (action.type) {
    case loginFail:
      return {
        loginErrorMessage: action.payload,
      }
    case hideLoginFail:
      return false
    case loginSuccess:
      return {}
    default:
      return state
  }
}

const signUpError = (state = false, action) => {
  switch (action.type) {
    case signUpFail:
      return {
        signUpErrorMessage: action.payload,
      }
    case hideSignUpFail:
      return false
    case signUpSuccess:
      return {}
    default:
      return state
  }
}

const signUp = createReducer(initialUserProfile, {
  // SIGN UP
  [signUpStart.type]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [signUpSuccess.type]: (state, action) => ({
    ...state,
    ...action.payload,
    loading: false,
    error: null,
  }),
  [signUpFail.type]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
})

export default combineReducers({
  isLoggedIn,
  loginError,
  signUpError,
  signUp,
})
