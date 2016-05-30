import { combineReducers } from 'redux'
import css     from './cssReducer'
import html    from './htmlReducer'
import slideUp from './slideUpReducer'

export default combineReducers({
  css,
  html,
  slideUp
});