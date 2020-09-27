import { fork, all } from "redux-saga/effects";
import { saga as loginSaga } from "../../ducks/login";
import { saga as signUpSaga } from "../../ducks/signUp";
import { saga as userDataSaga } from "../../ducks/userData";
import { saga as completeExerciseSaga } from "../../ducks/exercises";
import { saga as newEntrySaga } from "../../ducks/diaryEntry";
import { saga as algorithmSaga } from "../../ducks/algorithms";
import { saga as setAnswerSaga } from "../../ducks/question";
import { saga as completeQuestionnaireSaga } from "../../ducks/questionnaire";
import { saga as counterSaga } from "../../ducks/counter";

export default function* root() {
  const sagas = [
    ...loginSaga,
    ...signUpSaga,
    ...userDataSaga,
    ...completeExerciseSaga,
    ...newEntrySaga,
    ...setAnswerSaga,
    ...algorithmSaga,
    ...completeQuestionnaireSaga,
    ...counterSaga
  ];
  yield all([...sagas].map(saga => fork(saga)));
}
