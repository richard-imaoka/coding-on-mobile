import React        from 'react'
import ReactDOM     from 'react-dom'
import AjaxPreload  from '../ajax/ajaxPreload'
import App          from '../components/App'
import store        from '../store/store'

import { setCssSource }  from '../actions/cssActions'
import { setHtmlSource } from '../actions/htmlActions'

const preLoad = new AjaxPreload(() => {

  //notify the HTML that it's done
  console.log("completed. yeaaahhhh!!!!");

  store.dispatch( setCssSource(preLoad.CSS) );

  store.subscribe(() => {
    ReactDOM.render( <App store={store}/>, document.getElementById("app") );
  })

  store.dispatch( setHtmlSource(preLoad.HTML) );


});

