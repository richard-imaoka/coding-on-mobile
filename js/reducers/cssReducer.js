import {UPDATE_PROPERTY_VALUE, DELETE_PROPERTY, UPDATE_PROPERTY_NAME, SET_ENTIRE_STATE } from "../actions/cssActions"

export function css(state = {}, action = undefined){
  switch(action.type) {
    case SET_ENTIRE_STATE:
      console.log("action received", action);
      return action.css;
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
