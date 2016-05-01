import {UPDATE_PROPERTY_VALUE, DELETE_PROPERTY, UPDATE_PROPERTY_NAME, SET_ENTIRE_CSS_SOURCE } from "../actions/cssActions"
import * as cssParser from 'css'
import { fromJS } from 'immutable'

export function css(state = {}, action = undefined){
  switch(action.type) {
    case SET_ENTIRE_CSS_SOURCE:
      console.log("action received", action);
      const  cssJSON = cssParser.parse(action.cssSource);
      return fromJS(cssJSON);
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
