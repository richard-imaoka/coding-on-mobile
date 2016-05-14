import { SET_HTML_SOURCE_LIST } from "../actions/htmlSourceListActions"
import { List } from 'immutable'

export function htmlSourceList(state = {}, action = undefined){
  switch(action.type) {
    case SET_HTML_SOURCE_LIST:
      console.log("action received", action);
      if( Object.prototype.toString.call(action.htmlSourceList) === '[object Array]' )
        return List(action.htmlSourceList);
      else if( List.isList(action.htmlSourceList) )
        return action.htmlSourceList;
      else
        console.warn('invalid action received', action);
      return state;
    default:
      //console.log("HTML: undefined action received", action);
      return state;
  }
}
