import React        from 'react'
import ReactDOM     from 'react-dom'
import AjaxPreload  from '../ajax/ajaxPreload'
import App          from '../components/App'
import store        from '../store/store'

import { setEntireHTMLState, setEntireHTMLText } from "../actions/htmlActions"
import { setEntireState }                        from "../actions/cssActions"
import { setTotalSteps }                         from "../actions/navigationActions"

store.subscribe(() => {
  console.log("re render");
  ReactDOM.render( <App store={store}/>, document.getElementById("app") );
})

const totalSteps = 2;
let preload = new AjaxPreload(totalSteps, function(){
  store.dispatch( setEntireState(preload.getCSS(1) ) );
  store.dispatch( setEntireHTMLState(preload.getHTML(1)) );
  store.dispatch( setEntireHTMLText(preload.HTMLs[1]) );
  store.dispatch( setTotalSteps(totalSteps) );
});
