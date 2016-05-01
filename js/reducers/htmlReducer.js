import { SET_ENTIRE_HTML_DATA, SET_ENTIRE_HTML_TEXT } from '../actions/htmlActions'

export function html(state = {}, action = undefined){
  switch(action.type) {
    case SET_ENTIRE_HTML_DATA:
      console.log("action received", action);
      return action.html;
    default:
      //console.log("HTML: undefined action received", action);
      return state;
  }
}

export function htmlText(state = "", action = undefined){
  switch(action.type) {
    case SET_ENTIRE_HTML_TEXT:
      console.log("action received", action);
      return action.htmlText;
    default:
      //console.log("HTML: undefined action received", action);
      return state;
  }
}
