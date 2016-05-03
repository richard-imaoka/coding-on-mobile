export const SET_HTML_SOURCE_LIST = 'SET_HTML_SOURCE_LIST';

export function setHtmlSourceList( htmlSourceList ){
  return{ type: SET_HTML_SOURCE_LIST, htmlSourceList: htmlSourceList };
}