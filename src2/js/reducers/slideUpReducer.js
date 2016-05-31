import { SLIDEUP_EDITOR, CLOSE_EDITOR } from '../actions/slideUpActions'

export default function slideUp(state = {}, action = undefined){
  switch(action.type) {
    case CLOSE_EDITOR:
      console.log("action received:", action);
      return { actionType: CLOSE_EDITOR };
    case SLIDEUP_EDITOR:
      console.log("action received:", action);
      return { actionType: SLIDEUP_EDITOR, editorType: action.editorType, path: action.path };
    default:
      //console.log("HTML: undefined action received", action);
      return state;
  }
}