import {Map, List, fromJS} from 'immutable'
import {UPDATE_PROPERTY, DELETE_PROPERTY, UPDATE_PROPERTY_NAME} from "./actions"

function css(state = {}, action = undefined){
    switch(action.type) {
      case UPDATE_PROPERTY:
        return state.setIn( action.path, action.value )
      case UPDATE_PROPERTY_NAME:
        let value = state.getIn( action.path );
        let newPropertyPath = action.path.pop().push( action.newPropertyName );
        let deletedState    = state.deleteIn( action.path );
        return deletedState.setIn( newPropertyPath, value )
      case DELETE_PROPERTY:
        return state.deleteIn( action.path )
      default:
        return state
    }
}

export default css
//let action1 = {type: UPDATE_PROPERTY, path: List.of( "#box1", "background-color"), value: "red" };
//let map1    = fromJS({
//  "#box1": {
//    "background-color": "blue"
//  }
//})
//
//console.log(map1.toString())
//console.log(declarationBlock(map1, action1).toString())
