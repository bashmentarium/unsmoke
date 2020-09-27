import {AsyncStorage} from 'react-native'
import {call, put, takeLatest, all, select} from 'redux-saga/effects'
import {createAction} from '@reduxjs/toolkit'
import {allExercises} from '../constants/nice'
import {saveEntry, deleteEntry} from '../api/diaryEntry'

/* *
 * Constants
 * */
export const moduleName = 'diaryEntry'
const prefix = `${moduleName}`

export const ENTRY_START = `${prefix}/ENTRY_START`
export const ENTRY_SUCCESS = `${prefix}/ENTRY_SUCCESS`
export const ENTRY_ERROR = `${prefix}/ENTRY_ERROR`
export const HIDE_ERROR = `${prefix}/HIDE_ERROR`
export const DELETE_START = `${prefix}/DELETE_START`
export const DELETE_SUCCESS = `${prefix}/DELETE_SUCCESS`
export const DELETE_ERROR = `${prefix}/DELETE_ERROR`

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
    case ENTRY_START:
      return {
        loading: true,
        success: false,
        error: null,
      }
    case ENTRY_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
      }
    case ENTRY_ERROR:
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
export const diaryEntriesSelector = (state) => {
  if (
    state.userData.success.diaryEntries === null ||
    state.userData.success.diaryEntries === undefined
  ) {
    return []
  } else {
    return Object.values(state.userData.success.diaryEntries)
  }
}

export const showPlus = (state) => {
  const currentExercise = state.userData.success.currentExercise

  if (
    allExercises.indexOf(currentExercise) >
      allExercises.indexOf('abyi0fno16z') ||
    currentExercise === 'asdasd'
  ) {
    return true
  } else {
    return false
  }
}

/* *
 * Action Creators
 * */
export const saveEntryStart = createAction(ENTRY_START)
export const saveEntrySuccess = createAction(ENTRY_SUCCESS)
export const saveEntryError = createAction(ENTRY_ERROR)
export const hideError = createAction(HIDE_ERROR)
export const deleteEntryStart = createAction(DELETE_START)
export const deleteEntrySuccess = createAction(DELETE_SUCCESS)
export const deleteEntryError = createAction(DELETE_ERROR)

/* *
 * Sagas
 * */
export function* saveEntrySaga({type, payload}) {
  const {values, id} = payload
  const userId = yield AsyncStorage.getItem('userId')
  const token = yield AsyncStorage.getItem('tokenId')
  const entries = yield select(diaryEntriesSelector)

  const maxEntryIndex = Math.max(...entries.map((element) => element.index), 0)

  try {
    const request = yield call(saveEntry, {
      values,
      id,
      userId,
      token,
      index: maxEntryIndex + 1,
    })

    if (!request.ok) {
      const error = {}
      error.message = 'Something went wrong!'

      throw error
    }

    yield put(saveEntrySuccess({...payload, index: maxEntryIndex + 1}))
  } catch (error) {
    yield put(saveEntryError({error: error.message}))
  }
}

export function* deleteEntrySaga({type, payload}) {
  const userId = yield AsyncStorage.getItem('userId')
  const token = yield AsyncStorage.getItem('tokenId')

  try {
    const request = yield call(deleteEntry, {id: payload, userId, token})

    if (!request.ok) {
      const error = {}
      error.message = 'Something went wrong!'

      throw error
    }

    yield put(deleteEntrySuccess(payload))
  } catch (error) {
    yield put(deleteEntryError({error: error.message}))
  }
}

export const saga = [
  function* saga() {
    yield all([
      takeLatest(ENTRY_START, saveEntrySaga),
      takeLatest(DELETE_START, deleteEntrySaga),
    ])
  },
]
