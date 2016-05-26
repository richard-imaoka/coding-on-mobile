import { SLIDEUP_EDITOR, CLOSE_EDITOR } from '../actions/popupEditorActions'

export function slideUpEditor(state = {}, action = undefined){
  switch(action.type) {
    case CLOSE_EDITOR:
      console.log("action received:", action);
      return {};
    case SLIDEUP_EDITOR:
      console.log("action received:", action);
      return action;
    default:
      //console.log("HTML: undefined action received", action);
      return state;
  }
}