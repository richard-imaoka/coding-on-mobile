class AjaxPreload {

  constructor(currentStep, numSteps, callback ){
    this.HTMLs = [];
    this.CSSs  = [];
    this.completedHTMLSteps = 0;
    this.completedCSSSteps = 0;
    this.numSteps = numSteps;
    this.onFinishAjax = callback;

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
  
}

export default AjaxPreload;
