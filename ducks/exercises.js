import {AsyncStorage} from 'react-native'
import {call, put, takeLatest, takeEvery, all, select} from 'redux-saga/effects'
import {createAction} from '@reduxjs/toolkit'
import {userDataSelector} from './userData'
import {addCompleteExercise} from '../api/completeExercise'
import {unlockChapter} from '../api/chapter'
import {unlockAchievement, markAchievementsAsRead} from '../api/achievements'
import {unlockChapterSuccess} from './unlock'
import {allExercises as Exercises} from '../constants/nice'
import {currentExerciseSelector} from '../ducks/unlock'
/* *
 * Constants
 * */
export const moduleName = 'exercises'
const prefix = `${moduleName}`

export const COMPLETE_START = `${prefix}/COMPLETE_START`
export const COMPLETE_SUCCESS = `${prefix}/COMPLETE_SUCCESS`
export const COMPLETE_ERROR = `${prefix}/COMPLETE_ERROR`
export const HIDE_ERROR = `${prefix}/HIDE_ERROR`
export const UNLOCK_ACHIEVEMENT = `${prefix}/UNLOCK_ACHIEVEMENT`
export const MARK_AS_READ = `${prefix}/MARK_AS_READ`
export const MARK_AS_READ_ERROR = `${prefix}/MARK_AS_READ_ERROR`
export const UNLOCK_ACHIEVEMENT_ERROR = `${prefix}/UNLOCK_ACHIEVEMENT_ERROR`

export const NOOB = 'NOOB'
export const SAVANT = 'SAVANT'
export const NOVICE = 'NOVICE'
export const COMEDIAN = 'COMEDIAN'
export const MASTER = 'MASTER'
export const AWAKEN = 'AWAKEN'

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
    case COMPLETE_START:
      return {
        loading: true,
        success: false,
        error: null,
      }
    case COMPLETE_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
      }
    case COMPLETE_ERROR:
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

export const allExercises = (state = initialState, {type, payload}) => {
  return {
    c1fcbaee3: [
      '1p3223cyn5x',
      '2ky16b0v2kg',
      '35ltyndazmz',
      '42oag03key8',
      '5w8hc1kopqs',
      '64wd0rurgia',
      '7e6fh6ia27z',
      '8xoup11orcb',
      '9sptlevhjxs',
      'abyi0fno16z',
      'byz3xfe146p',
      'ca3erqm3tht',
    ],
    '4qdshogx3': [
      'd3jsltv656xjh',
      'e3jsltv6090ie',
      'f3jsltv7k34i9',
      'g3jsltv7exw8z',
      'h3jsltv71vlzw',
      'i3jsltv7yebqd',
      'j3jsltv7m0rmq',
      'k3jsltv706ned',
      'l3jsltv7ok9s7',
      'm3jsltv71cvkq',
      'n3jsltv82g16c',
      'o3jsltv8gm24r',
      'p3jsltv84k3qt',
      'q3jsltv8v9v6e',
      'r3jsltv8hmv2v',
    ],
    c4b8pzmnt: [
      'a3jsppjpo09pp',
      'b3jsppjpecm99',
      'c3jsppjpkytyd',
      'd3jsppjqpb2ni',
      'e3jsppjqzoijg',
      'f3jsppjqf971s',
      'g3jsppjq7x0yt',
      'h3jsppjqs25ql',
      'i3jsppjqm0xqm',
      'j3jsppjrh16di',
      'k3jsppjr4wj1k',
      'l3jsppjrs60d5',
      'm3jw86tj9gfyy',
      'n3jw86tj6ij14',
    ],
    c72e86zgw: [
      'a3jstnjkhco03',
      'b3jstnjlcy34q',
      'c3jstnjmvxhf3',
      'd3jstnjmurg8m',
      'e3jstnjmj17i6',
      'f3jstnjmkbjoc',
      'g3jstnjm22qjd',
      'h3jstnjm78tht',
      'i3jstnjmzxb8d',
      'j3jstnjmyutao',
      'k3jstnjmhfg0i',
    ],
    ijpj1khcc: [
      'a3jssbtoazi4j',
      'b3jssbtp5pkcl',
      'c3jssbtpi9zet',
      'd3jssbtpqsyll',
      'e3jssbtplk2qp',
      'f3jssbtpdiey4',
      'g3jssbtpaymr1',
    ],
  }
}

export const allChapters = (state = initialState, {type, payload}) => {
  return ['c1fcbaee3', '4qdshogx3', 'c4b8pzmnt', 'c72e86zgw', 'ijpj1khcc']
}

/* *
 * Selectors
 * */
export const completeExercisesSelector = (state) => {
  if (
    state.userData.success.completeExercises === null ||
    state.userData.success.completeExercises === undefined
  ) {
    return []
  }
  return Object.keys(state.userData.success.completeExercises) || []
}

export const completionPercentSelector = (state) => {
  const currentExercise = state.userData.success.currentExercise

  const asd = Exercises.indexOf(currentExercise)

  if (asd === -1) {
    return 100
  }

  return Math.trunc((asd / 59) * 100)
}

export const findSavant = (state) => {
  if (
    state.userData.success.completeExercises === null ||
    state.userData.success.completeExercises === undefined
  ) {
    return false
  }
  return Object.keys(state.userData.success.completeExercises).includes(
    '42oag03key8'
  )
}

export const findHistory = (state) => {
  if (
    state.userData.success.completeExercises === null ||
    state.userData.success.completeExercises === undefined
  ) {
    return false
  }
  const allHistory = [
    '1p3223cyn5x',
    '2ky16b0v2kg',
    '35ltyndazmz',
    '42oag03key8',
    '5w8hc1kopqs',
    '64wd0rurgia',
    '7e6fh6ia27z',
    '8xoup11orcb',
    '9sptlevhjxs',
    'abyi0fno16z',
    'byz3xfe146p',
    'ca3erqm3tht',
  ]

  const result = allHistory.every((f) =>
    Object.keys(state.userData.success.completeExercises).includes(f)
  )

  return result
}

export const findAnalysis = (state) => {
  if (
    state.userData.success.completeExercises === null ||
    state.userData.success.completeExercises === undefined
  ) {
    return false
  }
  const allAnalysis = [
    'd3jsltv656xjh',
    'e3jsltv6090ie',
    'f3jsltv7k34i9',
    'g3jsltv7exw8z',
    'h3jsltv71vlzw',
    'i3jsltv7yebqd',
    'j3jsltv7m0rmq',
    'k3jsltv706ned',
    'l3jsltv7ok9s7',
    'm3jsltv71cvkq',
    'n3jsltv82g16c',
    'o3jsltv8gm24r',
    'p3jsltv84k3qt',
    'q3jsltv8v9v6e',
    'r3jsltv8hmv2v',
  ]
  return allAnalysis.every((f) =>
    Object.keys(state.userData.success.completeExercises).includes(f)
  )
}

export const findJokes = (state) => {
  if (
    state.userData.success.completeExercises === null ||
    state.userData.success.completeExercises === undefined
  ) {
    return false
  }
  const allJokes = [
    'a3jstnjkhco03',
    'b3jstnjlcy34q',
    'c3jstnjmvxhf3',
    'd3jstnjmurg8m',
    'e3jstnjmj17i6',
    'f3jstnjmkbjoc',
    'g3jstnjm22qjd',
    'h3jstnjm78tht',
    'i3jstnjmzxb8d',
    'j3jstnjmyutao',
    'k3jstnjmhfg0i',
  ]
  return allJokes.every((f) =>
    Object.keys(state.userData.success.completeExercises).includes(f)
  )
}

export const shift = (state) => {
  if (
    state.userData.success.completeExercises === null ||
    state.userData.success.completeExercises === undefined
  ) {
    return false
  }
  const allShift = [
    'a3jsppjpo09pp',
    'b3jsppjpecm99',
    'c3jsppjpkytyd',
    'd3jsppjqpb2ni',
    'e3jsppjqzoijg',
    'f3jsppjqf971s',
    'g3jsppjq7x0yt',
    'h3jsppjqs25ql',
    'i3jsppjqm0xqm',
    'j3jsppjrh16di',
    'k3jsppjr4wj1k',
    'l3jsppjrs60d5',
    'm3jw86tj9gfyy',
    'n3jw86tj6ij14',
  ]
  return allShift.every((f) =>
    Object.keys(state.userData.success.completeExercises).includes(f)
  )
}

export const findBodyweight = (state) => {
  if (
    state.userData.success.completeExercises === null ||
    state.userData.success.completeExercises === undefined
  ) {
    return false
  }
  const allBodyweight = [
    'a3jssbtoazi4j',
    'b3jssbtp5pkcl',
    'c3jssbtpi9zet',
    'd3jssbtpqsyll',
    'e3jssbtplk2qp',
    'f3jssbtpdiey4',
    'g3jssbtpaymr1',
  ]
  return allBodyweight.every((f) =>
    Object.keys(state.userData.success.completeExercises).includes(f)
  )
}

export const unreadAchievementsSelector = (state) => {
  const userData = userDataSelector(state)

  return userData.unreadAchievementsAmount || 0
}

export const unlockedAchievementsSelector = (state) => {
  const userData = userDataSelector(state)

  return userData.unlockedAchievements || []
}

/* *
 * Action Creators
 * */
export const completeExerciseStart = createAction(COMPLETE_START)
export const completeExerciseSuccess = createAction(COMPLETE_SUCCESS)
export const completeExerciseError = createAction(COMPLETE_ERROR)
export const hideError = createAction(HIDE_ERROR)
export const unlockAchievementAction = createAction(UNLOCK_ACHIEVEMENT)
export const markAsRead = createAction(MARK_AS_READ)
export const markAsReadError = createAction(MARK_AS_READ_ERROR)
export const unlockAchievementError = createAction(UNLOCK_ACHIEVEMENT_ERROR)

/* *
 * Sagas
 * */
export function* completeExerciseSaga({type, payload}) {
  try {
    const userId = yield AsyncStorage.getItem('userId')
    const token = yield AsyncStorage.getItem('tokenId')

    yield call(addCompleteExercise, {
      id: payload.nextExerciseId,
      userId,
      token,
    })

    yield put(completeExerciseSuccess(payload.nextExerciseId))

    if (payload.nextExerciseId === 'd3jsltv656xjh') {
      yield call(unlockChapter, {userId, token, id: '4qdshogx3'})
      yield put(unlockChapterSuccess('4qdshogx3'))
    }

    if (payload.nextExerciseId === 'a3jsppjpo09pp') {
      yield call(unlockChapter, {userId, token, id: 'c4b8pzmnt'})
      yield put(unlockChapterSuccess('c4b8pzmnt'))
    }

    if (payload.nextExerciseId === 'a3jstnjkhco03') {
      yield call(unlockChapter, {userId, token, id: 'c72e86zgw'})
      yield put(unlockChapterSuccess('c72e86zgw'))
    }

    if (payload.nextExerciseId === 'a3jssbtoazi4j') {
      yield call(unlockChapter, {userId, token, id: 'ijpj1khcc'})
      yield put(unlockChapterSuccess('ijpj1khcc'))
    }

    if (payload.nextExerciseId === undefined) {
      yield call(addCompleteExercise, {
        id: 'asdasd',
        userId,
        token,
      })
      yield put(completeExerciseSuccess('asdasd'))
    }
  } catch (error) {
    yield put(completeExerciseError({error: error.message}))
  }
}

export function* achievementsSaga() {
  try {
    const userId = yield AsyncStorage.getItem('userId')
    const token = yield AsyncStorage.getItem('tokenId')

    const completeExercises = yield select(completeExercisesSelector)
    const shiftUnlock = yield select(shift)
    const jokesUnlock = yield select(findJokes)
    const savantUnlock = yield select(findSavant)

    const unreadAchievementsAmount = yield select(unreadAchievementsSelector)
    const unlockedAchievements = yield select(unlockedAchievementsSelector)

    const currentExercise = yield select(currentExerciseSelector)

    if (Exercises.indexOf(currentExercise) > Exercises.indexOf('1p3223cyn5x')) {
      if (!unlockedAchievements.includes(NOOB)) {
        yield call(unlockAchievement, {
          userId,
          token,
          amount: unreadAchievementsAmount + 1,
          unlockedAchievements: [...unlockedAchievements, NOOB],
        })
        yield put(
          unlockAchievementAction({
            unreadAchievementsAmount: unreadAchievementsAmount + 1,
            unlockedAchievements: [...unlockedAchievements, NOOB],
          })
        )
      }
    }

    if (Exercises.indexOf(currentExercise) > Exercises.indexOf('42oag03key8')) {
      if (!unlockedAchievements.includes(SAVANT)) {
        yield call(unlockAchievement, {
          userId,
          token,
          amount: unreadAchievementsAmount + 1,
          unlockedAchievements: [...unlockedAchievements, SAVANT],
        })
        yield put(
          unlockAchievementAction({
            unreadAchievementsAmount: unreadAchievementsAmount + 1,
            unlockedAchievements: [...unlockedAchievements, SAVANT],
          })
        )
      }
    }

    if (
      Exercises.indexOf(currentExercise) > Exercises.indexOf('n3jw86tj6ij14')
    ) {
      if (!unlockedAchievements.includes(MASTER)) {
        yield call(unlockAchievement, {
          userId,
          token,
          amount: unreadAchievementsAmount + 1,
          unlockedAchievements: [...unlockedAchievements, MASTER],
        })
        yield put(
          unlockAchievementAction({
            unreadAchievementsAmount: unreadAchievementsAmount + 1,
            unlockedAchievements: [...unlockedAchievements, MASTER],
          })
        )
      }
    }

    if (
      Exercises.indexOf(currentExercise) > Exercises.indexOf('k3jstnjmhfg0i')
    ) {
      if (!unlockedAchievements.includes(COMEDIAN)) {
        yield call(unlockAchievement, {
          userId,
          token,
          amount: unreadAchievementsAmount + 1,
          unlockedAchievements: [...unlockedAchievements, COMEDIAN],
        })
        yield put(
          unlockAchievementAction({
            unreadAchievementsAmount: unreadAchievementsAmount + 1,
            unlockedAchievements: [...unlockedAchievements, COMEDIAN],
          })
        )
      }
    }

    if (currentExercise === 'asdasd') {
      if (!unlockedAchievements.includes(AWAKEN)) {
        yield call(unlockAchievement, {
          userId,
          token,
          amount: unreadAchievementsAmount + 1,
          unlockedAchievements: [...unlockedAchievements, AWAKEN],
        })
        yield put(
          unlockAchievementAction({
            unreadAchievementsAmount: unreadAchievementsAmount + 1,
            unlockedAchievements: [...unlockedAchievements, AWAKEN],
          })
        )
      }
    }
  } catch (error) {
    yield put(unlockAchievementError({error: error.message}))
  }
}

export function* markAchievementsAsReadSaga() {
  try {
    const userId = yield AsyncStorage.getItem('userId')
    const token = yield AsyncStorage.getItem('tokenId')

    yield call(markAchievementsAsRead, {userId, token})

    yield put(markAsRead)
  } catch (error) {
    yield put(markAsReadError({error: error.message}))
  }
}

export const saga = [
  function* saga() {
    yield all([
      takeLatest(COMPLETE_START, completeExerciseSaga),
      takeEvery(MARK_AS_READ, markAchievementsAsReadSaga),
      takeEvery(COMPLETE_SUCCESS, achievementsSaga),
    ])
  },
]
