import React        from 'react'
import ReactDOM     from 'react-dom'
import AjaxPreload  from '../ajax/ajaxPreload'
import App          from '../components/App'
import store        from '../store/store'

store.subscribe(() => {
  console.log("re render");
  ReactDOM.render( <App store={store}/>, document.getElementById("app") );
})

const totalSteps = 4;
new AjaxPreload(totalSteps, store)