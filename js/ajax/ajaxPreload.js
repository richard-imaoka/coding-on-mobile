import * as css from 'css'
import { fromJS } from 'immutable'

class AjaxPreload {

  constructor(numSteps, onCompleteCallback = undefined ){
    this.HTMLs = [];
    this.CSSs  = [];
    this.completedHTMLSteps = 0;
    this.completedCSSSteps = 0;
    this.numSteps = numSteps;
    this.onCompleteCallback = onCompleteCallback;

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

  getHTML(i) {
    var parser = new DOMParser();
    var doc    = parser.parseFromString(this.HTMLs[i], "text/html");
    var html   = doc.children[0];
    return html;
  }

  getCSS(i) {
    const cssJSON= css.parse(this.CSSs[i]);
    return fromJS(cssJSON);
  }

  isFinishedAjax(){
    return this.numSteps === this.completedHTMLSteps && this.numSteps === this.completedCSSSteps;
  }

  onFinishAjax(){
    //notify the HTML that it's done
    console.log("completed. yeaaahhhh!!!!");

    this.onCompleteCallback();
  }



}

export default AjaxPreload;
