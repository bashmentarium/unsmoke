import fixtures from '../fixtures'

function getQuestions() {
  const allQuestions = fixtures
    .map(f => f.exercises.map(exercise => exercise.questionnaires || []).flat())
    .flat()
    .map(questionnaire =>
      questionnaire.questions
        ? questionnaire.questions.map(q => ({
            ...q,
            questionnaireId: questionnaire.id
          }))
        : []
    )
    .flat()
  const allIds = allQuestions.map(q => q.id)
  const byId = allQuestions.reduce((acc, q) => {
    acc[q.id] = q
    return acc
  }, {})
  return {allIds, byId}
}

export const questions = (state = getQuestions(), {}) => {
  return state
}

// Selectors
export const questionsByQuestionnairesId = (state, ownProps) => {
  return state.questions.allIds
    .map(id => state.questions.byId[id])
    .filter(question => question.questionnaireId === ownProps.id)
}
