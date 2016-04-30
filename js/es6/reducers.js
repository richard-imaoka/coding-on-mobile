import {UPDATE_PROPERTY_VALUE, DELETE_PROPERTY, UPDATE_PROPERTY_NAME, SET_ENTIRE_STATE} from "./actions"


function cssReducer(state = {}, action = undefined){
    switch(action.type) {
      case SET_ENTIRE_STATE:
        console.log("action received", action);
        return action.state
      case UPDATE_PROPERTY_VALUE:
        console.log("action received", action);
        return state.setIn( action.path, action.newPropertyValue )
      case UPDATE_PROPERTY_NAME:
        console.log("action received", action);
        return state.setIn( action.path, action.newPropertyName )
      case DELETE_PROPERTY:
        console.log("action received", action);
        return state.deleteIn( action.path )
      default:
        console.log("undefined action received", action);
        return state
    }
}

export default cssReducer
//let action1 = {type: UPDATE_PROPERTY, path: List.of( "#box1", "background-color"), value: "red" };
//let map1    = fromJS({
//  "#box1": {
//    "background-color": "blue"
//  }
//})
//
//console.log(map1.toString())
//console.log(declarationBlock(map1, action1).toString())
