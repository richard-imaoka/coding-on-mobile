import { SLIDEUP_EDITOR, CLOSE_EDITOR } from '../actions/slideUpActions'

export default function slideUp(state = { actionType: CLOSE_EDITOR }, action = undefined){
  switch(action.type) {
    case CLOSE_EDITOR:
      console.log("action received:", action);
      return {
        actionType: CLOSE_EDITOR,
        transition: { from: state.actionType, to: action.type }
      };
    case SLIDEUP_EDITOR:
      console.log("action received:", action);
      return {
        actionType: SLIDEUP_EDITOR,
        editorType: action.editorType,
        path      : action.path,
        transition: { from: state.actionType, to: action.type }
      };
    default:
      //console.log("HTML: undefined action received", action);
      return state;
  }
}