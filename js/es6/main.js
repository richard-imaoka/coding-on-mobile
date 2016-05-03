import React        from 'react'
import ReactDOM     from 'react-dom'
import AjaxPreload  from '../ajax/ajaxPreload'
import App          from '../components/App'
import store        from '../store/store'

import { gotoStep }          from '../actions/stepActions'
import { setCssSourceList }  from '../actions/cssSourceListActions'
import { setHtmlSourceList } from '../actions/htmlSourceListActions'
import { getCurrentStepFromUrl, newUrl } from '../browserURL/history'

window.onpopstate =function(e) {
  const step = getCurrentStepFromUrl(e.target.location.href);
  store.dispatch(gotoStep(step));
};

const totalSteps  = 4;
const currentStep = getCurrentStepFromUrl(window.location.href);

const preLoad     = new AjaxPreload(currentStep, totalSteps, () => {
  //notify the HTML that it's done
  console.log("completed. yeaaahhhh!!!!");
  store.dispatch( setHtmlSourceList(preLoad.HTMLs) );
  store.dispatch( setCssSourceList(preLoad.CSSs) );
  store.subscribe(() => {
    console.log("re render");
    const step = store.getCurrentStep();
    const url  = newUrl( step );
    if( url !== window.location.href )
      window.history.pushState( {}, "" + currentStep, url );

    ReactDOM.render( <App store={store}/>, document.getElementById("app") );
  })

  store.dispatch( gotoStep( currentStep ) );
});

