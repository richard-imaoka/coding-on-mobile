import {Map, List, fromJS} from 'immutable'
import {UPDATE_PROPERTY_VALUE, DELETE_PROPERTY, UPDATE_PROPERTY_NAME} from "./actions"


function cssReducer(state = {}, action = undefined){
    switch(action.type) {
      case UPDATE_PROPERTY_VALUE:
        return state.setIn( action.path, action.newPropertyValue )
      case UPDATE_PROPERTY_NAME:
        return state.setIn( action.path, action.newPropertyName )
      case DELETE_PROPERTY:
        return state.deleteIn( action.path )
      default:
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
