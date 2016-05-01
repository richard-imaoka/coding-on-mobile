import { combineReducers } from 'redux'
import { html }            from './htmlDataReducer'
import { css }             from './cssDataReducer'
import { navigation }      from './navigationReducer'

export const combined = combineReducers({
  html,
  css,
  navigation
})

