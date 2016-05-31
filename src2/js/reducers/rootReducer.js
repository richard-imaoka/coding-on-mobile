import { combineReducers } from 'redux-immutable'
import css     from './cssReducer'
import html    from './htmlReducer'
import slideUp from './slideUpReducer'

export default combineReducers({
  css,
  html,
  slideUp
});