import React from 'react'
import ReactDOM  from 'react-dom'
import AjaxPreload from './ajaxPreload'
import Page from './Page'

let preload = new AjaxPreload(1);

ReactDOM.render( <Page/>, document.getElementById("app") );

// onNext = {
//   next     =
//   cssData  = preload.getCSS(next);
//   htmlData = preload.getHTML(next);
//   renderHTML
//   renderCSS
//   renderResult
// }
//
// onPrev = {
//   cssData  = preload.getCSS(next);
//   htmlData = preload.getHTML(next);
//   renderHTML
//   renderCSS
//   renderResult
// }

