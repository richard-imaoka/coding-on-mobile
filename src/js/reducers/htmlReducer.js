import { Map, List } from 'immutable'
import { htmlDataReducer } from './htmlDataReducer'
import { htmlSourceList }  from './htmlSourceListReducer'
import { GOTO_STEP }       from '../actions/stepActions'

export function html(state = Map({htmlData: {}, htmlSourceList: List(), htmlSource: ""}), action = undefined){

  switch(action.type) {
    case GOTO_STEP:
      const htmlSource = state.get("htmlSourceList").get(action.step);
      const parser     = new DOMParser();
      const doc        = parser.parseFromString(htmlSource, "text/html");
      return state.set("htmlData", doc).set("htmlSource", htmlSource);
    default:
      //console.log("CSS: undefined action received", action);
      return state
        .set("htmlData",       htmlDataReducer(state.get("htmlData"),      action))
        .set("htmlSourceList", htmlSourceList(state.get("htmlSourceList"), action));
  }
}
