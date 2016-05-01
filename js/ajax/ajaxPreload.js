import { setCssSourceList } from '../actions/cssSourceListActions'
import { setHtmlSourceList } from '../actions/htmlSourceListActions'
import { setEntireHtmlSource } from "../actions/htmlActions"
import { setEntireCssSource }  from "../actions/cssActions"
import { setTotalSteps, gotoStep }       from "../actions/navigationActions"
class AjaxPreload {

  constructor(numSteps, store ){
    this.HTMLs = [];
    this.CSSs  = [];
    this.completedHTMLSteps = 0;
    this.completedCSSSteps = 0;
    this.numSteps = numSteps;
    this.store = store;

    for(var i=1; i<=numSteps; i++){
      this.ajaxHTML(i);
      this.ajaxCSS(i);
    }
  }

  ajaxHTML(i, suffix) {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "sample" + i + ".html", true);

    const self = this;
    ajax.onload = function () {
        self.completedHTMLSteps++;

      self.HTMLs[i] = ajax.responseText;
      if(self.isFinishedAjax())
        self.onFinishAjax();
    }
    ajax.send();
  }

  ajaxCSS(i, suffix) {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "sample" + i + ".css", true);

    const self = this;
    ajax.onload = function () {
      self.completedCSSSteps++;

      self.CSSs[i] = ajax.responseText;
      if(self.isFinishedAjax())
        self.onFinishAjax();
    }
    ajax.send();
  }

  getHtmlSource(i) {
    return this.HTMLs[i];
  }

  getCssSource(i) {
    return this.CSSs[i];
  }

  isFinishedAjax(){
    return this.numSteps === this.completedHTMLSteps && this.numSteps === this.completedCSSSteps;
  }

  onFinishAjax(){
    //notify the HTML that it's done
    console.log("completed. yeaaahhhh!!!!");
    this.store.dispatch( setEntireHtmlSource(this.getHtmlSource(1)) );
    this.store.dispatch( setCssSourceList(this.CSSs) );
    this.store.dispatch( gotoStep( 1 ) );
    this.store.dispatch( setTotalSteps(this.numSteps) );
    // this.store.dispatch( setHtmlSourceList(this.HTMLs) );
  }



}

export default AjaxPreload;
