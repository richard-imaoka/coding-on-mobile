import { SET_ENTIRE_HTML_SOURCE } from '../actions/htmlActions'

export function html(state = {}, action = undefined){
  switch(action.type) {
    case SET_ENTIRE_HTML_SOURCE:
      console.debug("action received", action);
      const parser = new DOMParser();
      const doc    = parser.parseFromString(action.htmlSource, "text/html");
      let   html   = doc.children[0];
      html._Source = action.htmlSource;
      return html;
    default:
      //console.log("HTML: undefined action received", action);
      return state;
  }
}