import { POPUP_EDITOR, CLOSE_EDITOR } from '../actions/popupEditorActions'

export function popup(state = {}, action = undefined){
  switch(action.type) {
    case CLOSE_EDITOR:
      return {};
    case POPUP_EDITOR:
      console.log("action received:", action);
      return action;
    default:
      //console.log("HTML: undefined action received", action);
      return state;
  }
}