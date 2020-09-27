import { AsyncStorage } from "react-native";
import { call, put, takeLatest, all, select } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { completeQuestionnaire } from "../api/questionnaire";
import { addCompleteExercise } from "../api/completeExercise";

import { completeExerciseSuccess } from "./exercises";

/* *
 * Constants
 * */
export const moduleName = "questionnaire";
const prefix = `${moduleName}`;

export const START = `${prefix}/START`;
export const SUCCESS = `${prefix}/SUCCESS`;
export const ERROR = `${prefix}/ERROR`;

/* *
 * Reducer
 * */

/* *
 * Selectors
 * */
export const completeQuestionnairesSelector = state => {
  if (
    state.userData.success.completeQuestionnaires === null ||
    state.userData.success.completeQuestionnaires === undefined
  ) {
    return [];
  }
  return Object.keys(state.userData.success.unlockedExercises) || [];
};

/* *
 * Action Creators
 * */
export const completeQuestionnaireStart = createAction(START);
export const completeQuestionnaireSuccess = createAction(SUCCESS);
export const completeQuestionnaireError = createAction(ERROR);

/* *
 * Sagas
 * */
export function* completeQuestionnaireSaga({ type, payload }) {
  const userId = yield AsyncStorage.getItem("userId");
  const tokenId = yield AsyncStorage.getItem("tokenId");

  try {
    const request = yield call(completeQuestionnaire, {
      id: payload,
      userId,
      tokenId
    });

    if (!request.ok) {
      const error = {};
      error.message = "Something went wrong!";

      throw error;
    }

    yield put(completeQuestionnaireSuccess(payload));
  } catch (error) {
    return yield put(completeQuestionnaireError({ error: error.message }));
  }
}

export const saga = [
  function* saga() {
    yield all([takeLatest(START, completeQuestionnaireSaga)]);
  }
];
