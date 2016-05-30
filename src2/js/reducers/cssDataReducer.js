import {UPDATE_PROPERTY_VALUE, DELETE_PROPERTY, UPDATE_PROPERTY_NAME } from "../actions/cssActions"
import { Map } from 'immutable'

export function cssDataReducer(state = Map(), action = undefined){
  switch(action.type) {
    case UPDATE_PROPERTY_VALUE:
      console.log("action received", action);
      return state.setIn( action.path, action.newPropertyValue );
    case UPDATE_PROPERTY_NAME:
      console.log("action received", action);
      return state.setIn( action.path, action.newPropertyName );
    case DELETE_PROPERTY:
      console.log("action received", action);
      return state.deleteIn( action.path );
    default:
      //console.log("CSS: undefined action received", action);
      return state;
  }
}
