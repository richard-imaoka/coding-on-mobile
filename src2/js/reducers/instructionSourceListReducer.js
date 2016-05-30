import { SET_INSTRUCTION_SOURCE_LIST } from "../actions/instructionSourceListActions"
import { List } from 'immutable'

export function instructionSourceList(state = {}, action = undefined){
  switch(action.type) {
    case SET_INSTRUCTION_SOURCE_LIST:
      console.log("action received", action);
      if( Object.prototype.toString.call(action.instructionSourceList) === '[object Array]' )
        return List(action.instructionSourceList);
      else if( List.isList(action.instructionSourceList) )
        return action.instructionSourceList;
      else
        console.warn('invalid action received', action);
      return state;
    default:
      //console.log("HTML: undefined action received", action);
      return state;
  }
}
