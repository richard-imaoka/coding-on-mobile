import {UPDATE_PROPERTY_VALUE, DELETE_PROPERTY, UPDATE_PROPERTY_NAME, SET_ENTIRE_STATE, SET_ENTIRE_HTML_DATA} from "../actions/actions"
import { combineReducers } from 'redux'

function css(state = {}, action = undefined){
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

function html(state = {}, action = undefined){
  switch(action.type) {
    case SET_ENTIRE_HTML_DATA:
      console.log("action received", action);
      return action.html;
    default:
      //console.log("HTML: undefined action received", action);
      return state;
  }
}

export const combined = combineReducers({
  html,
  css
})

export default css;

//let action1 = {type: UPDATE_PROPERTY, path: List.of( "#box1", "background-color"), value: "red" };
//let map1    = fromJS({
//  "#box1": {
//    "background-color": "blue"
//  }
//})
//
//console.log(map1.toString())
//console.log(declarationBlock(map1, action1).toString())
