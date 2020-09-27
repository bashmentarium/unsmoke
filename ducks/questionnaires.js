import fixtures from '../fixtures'
import {questionsByQuestionnairesId, selectedAnswerId} from './question'

function getQuestionnairesById() {
  const allQuestionnaires = fixtures
    .map(f => f.exercises.map(exercise => exercise.questionnaires || []).flat())
    .flat()
  const allIds = allQuestionnaires.map(q => q.id)
  const byId = allQuestionnaires.reduce((acc, q) => {
    acc[q.id] = q
    return acc
  }, {})
  return {allIds, byId}
}

export const questionnaires = (state = {}, {}) => {
  return []
}

// selectors
export const getAnswersWeightByGroup = (state, ownProps) => {
  const questions = questionsByQuestionnairesId(state, ownProps)
  const weightByGroup = questions.reduce((acc, question) => {
    const {options, id, group} = question
    if (!acc[group]) {
      acc[question.group] = 0
    }
    const answerId = selectedAnswerId(state, {question})
    const answer = options.find(option => option.id === answerId)
    if (!answer) {
      return acc
    }
    acc[group] += answer.weight

    return acc
  }, {})
  return weightByGroup
}

export const isCompleted = (state, ownProps) => {
  const questions = questionsByQuestionnairesId(state, ownProps)
  return questions.every(question => selectedAnswerId(state, {question}))
}

export const getCompleteQuestionnaires = state => {
  if (state.login.success) {
    return state.userData.success.completeQuestionnaires
  } else {
    return []
  }
}

export const getAllQuestionnaires = state => {
  if (state.userData.success.completeQuestionnaires) {
    return Object.keys(state.userData.success.completeQuestionnaires)
  }
  return []
}
