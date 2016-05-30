import { SET_HTML_SOURCE }       from '../actions/htmlActions'
import { Map } from 'immutable'

export default function html(state = Map(), action = undefined){

  switch(action.type) {
    case SET_HTML_SOURCE:
      console.log("action received", action);
      const htmlSource = action.htmlSource;
      const parser     = new DOMParser();
      const doc        = parser.parseFromString(htmlSource, "text/html");
      return state.set("htmlData", doc).set("htmlSource", htmlSource);
    default:
      return state;
  }
}
