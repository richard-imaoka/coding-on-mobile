import React        from 'react'
import ReactDOM     from 'react-dom'
import AjaxPreload  from '../ajax/ajaxPreload'
import App          from '../components/App'
import store        from '../store/store'

import { setEntireHtmlSource } from "../actions/htmlActions"
import { setEntireCssSource }  from "../actions/cssActions"
import { setTotalSteps }       from "../actions/navigationActions"

store.subscribe(() => {
  console.log("re render");
  ReactDOM.render( <App store={store}/>, document.getElementById("app") );
})

const totalSteps = 2;
let preload = new AjaxPreload(totalSteps, function(){
  store.dispatch( setEntireCssSource(preload.getCssSource(1) ) );
  store.dispatch( setEntireHtmlSource(preload.getHtmlSource(1)) );
  store.dispatch( setTotalSteps(totalSteps) );
});
