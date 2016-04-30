import React from 'react'
import ReactDOM  from 'react-dom'
import { createStore } from 'redux'

import AjaxPreload  from './ajaxPreload'
import Page         from './Page'
import { combined } from './reducers'
import { setEntireState, setEntireHTMLState } from "./actions"

let store = createStore(combined);
store.subscribe(() => {
  console.log("re render");
  ReactDOM.render( <Page store={store}/>, document.getElementById("app") );
})

let preload = new AjaxPreload(1, function(){
  store.dispatch( setEntireState(preload.getCSS(1) ) );
  store.dispatch( setEntireHTMLState(preload.getHTML(1)) );
});


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

