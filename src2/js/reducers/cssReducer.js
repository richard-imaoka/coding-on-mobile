import {SET_CSS_SOURCE, UPDATE_PROPERTY_VALUE, DELETE_PROPERTY, UPDATE_PROPERTY_NAME } from "../actions/cssActions"
import * as cssParser from 'css'
import { Map, fromJS } from 'immutable'

export default function cssDataReducer(state = Map(), action = undefined){
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
    case SET_CSS_SOURCE:
      console.log("action received", action);
      const  cssSource = action.cssSource;
      const  cssJSON   = cssParser.parse(cssSource);
      return fromJS(cssJSON);
    default:
      //console.log("CSS: undefined action received", action);
      return state;
  }
}
