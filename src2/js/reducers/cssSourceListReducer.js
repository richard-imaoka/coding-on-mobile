import { SET_CSS_SOURCE_LIST } from "../actions/cssSourceListActions"
import { List } from 'immutable'

export function cssSourceList(state = List(), action = undefined){
  switch(action.type) {
    case SET_CSS_SOURCE_LIST:
      console.log("action received", action);
      if( Object.prototype.toString.call(action.cssSourceList) === '[object Array]' )
        return List(action.cssSourceList);
      else if( List.isList(action.cssSourceList) )
        return action.cssSourceList;
      else
        console.warn('invalid action received', action);
        return state;
    default:
      //console.log("CSS: undefined action received", action);
      return state;
  }
}
