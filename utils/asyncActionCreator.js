import {createAction} from '@reduxjs/toolkit'

/**
 * @method createAsyncAction
 * @description Creates an async action creator from given plain action object
 * @param {any[]} action
 * @returns {any[]} - createAsyncAction
 */
function createAsyncAction(action) {
  return {
    START: createAction(`${action}_START`),
    SUCCESS: createAction(`${action}_SUCCESS`),
    ERROR: createAction(`${action}_ERROR`),
  }
}

export default createAsyncAction
