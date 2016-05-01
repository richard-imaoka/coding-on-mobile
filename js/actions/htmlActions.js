export const SET_ENTIRE_HTML_DATA  = 'SET_ENTIRE_HTML_DATA';
export const SET_ENTIRE_HTML_TEXT  = 'SET_ENTIRE_HTML_TEXT';

export function setEntireHTMLState( html ){
  return{ type: SET_ENTIRE_HTML_DATA, html: html };
}

export function setEntireHTMLText( htmlText ){
  return{ type: SET_ENTIRE_HTML_TEXT, htmlText: htmlText };
}
