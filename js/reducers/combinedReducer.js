import { combineReducers } from 'redux'
import { html, htmlText }  from './htmlReducer'
import { css }             from './cssReducer'
import { navigation }      from './navigationReducer'

export const combined = combineReducers({
  htmlText,
  html,
  css,
  navigation
})

