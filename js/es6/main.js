import React from 'react'
import ReactDOM  from 'react-dom'
import { createStore } from 'redux'

import AjaxPreload  from '../ajax/ajaxPreload'
import App          from '../components/App'
import { combined } from '../reducers/reducers'
import { setEntireState, setEntireHTMLState } from "../actions/actions"

let store = createStore(combined);
store.subscribe(() => {
  console.log("re render");
  ReactDOM.render( <App store={store}/>, document.getElementById("app") );
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

