import {createAction} from '@reduxjs/toolkit'

/* *
 * Constants
 * */
export const moduleName = 'unlock'
const prefix = `${moduleName}`

export const CHAPTER_START = `${prefix}/CHAPTER_START`
export const CHAPTER_SUCCESS = `${prefix}/CHAPTER_SUCCESS`
export const CHAPTER_ERROR = `${prefix}/CHAPTER_ERROR`

export const EXERCISE_START = `${prefix}/EXERCISE_START`
export const EXERCISE_SUCCESS = `${prefix}/EXERCISE_SUCCESS`
export const EXERCISE_ERROR = `${prefix}/EXERCISE_ERROR`

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
export const currentExerciseSelector = (state) => {
  if (
    state.userData.success.currentExercise === null ||
    state.userData.success.currentExercise === undefined
  ) {
    return []
  }
  return state.userData.success.currentExercise
}

export const currentChapterSelector = (state) => {
  if (
    state.userData.success.currentChapter === null ||
    state.userData.success.currentChapter === undefined
  ) {
    return []
  }
  return state.userData.success.currentChapter
}

/* *
 * Action Creators
 * */
export const unlockChapterStart = createAction(CHAPTER_START)
export const unlockChapterSuccess = createAction(CHAPTER_SUCCESS)
export const unlockChapterError = createAction(CHAPTER_ERROR)

export const unlockExerciseStart = createAction(EXERCISE_START)
export const unlockExerciseSuccess = createAction(EXERCISE_SUCCESS)
export const unlockExerciseError = createAction(EXERCISE_ERROR)

/* *
 * Sagas
 * */
