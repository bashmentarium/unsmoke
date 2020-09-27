import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer.js'
import customMiddleWare from './middleware'
import mySaga from './sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  {},
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware, customMiddleWare))
)

sagaMiddleware.run(mySaga)

// DEV ONLY
window.store = store

export default store
