import { combineReducers } from 'redux'
import { html }            from './htmlReducer'
import { css }             from './cssReducer'
import { navigation }      from './navigationReducer'

export const combined = combineReducers({
  html,
  css,
  navigation
})

