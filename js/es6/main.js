import React from 'react'
import ReactDOM  from 'react-dom'

import AjaxPreload  from '../ajax/ajaxPreload'
import App          from '../components/App'
import store        from '../store/store'

import { setEntireState, setEntireHTMLState, setEntireHTMLText } from "../actions/actions"

store.subscribe(() => {
  console.log("re render");
  console.log(store.getSource());
  ReactDOM.render( <App store={store}/>, document.getElementById("app") );
})

let preload = new AjaxPreload(1, function(){
  store.dispatch( setEntireState(preload.getCSS(1) ) );
  store.dispatch( setEntireHTMLState(preload.getHTML(1)) );
  store.dispatch( setEntireHTMLText(preload.HTMLs[1]) );
});
