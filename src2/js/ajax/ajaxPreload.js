class AjaxPreload {

  constructor(currentStep, numSteps, callback ){
    this.HTMLs = [];
    this.CSSs  = [];
    this.InstructionJSONs  = [];
    this.completedHTMLSteps = 0;
    this.completedCSSSteps = 0;
    this.completedInstructionSteps = 0;
    this.numSteps = numSteps;
    this.onFinishAjax = callback;

    for(var i=1; i<=numSteps; i++){
      this.ajaxHTML(i);
      this.ajaxCSS(i);
      this.ajaxInstructionJSON(i);
    }
  }

  ajaxHTML(i) {
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

  ajaxCSS(i) {
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

  ajaxInstructionJSON(i) {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "instruction" + i + ".json", true);

    const self = this;
    ajax.onload = function () {
      self.completedInstructionSteps++;

      self.InstructionJSONs[i] = ajax.responseText;
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

  getInstructionJSON(i) {
    return this.InstructionJSONs[i];
  }

  isFinishedAjax(){
    return this.numSteps === this.completedHTMLSteps
      && this.numSteps === this.completedCSSSteps
      && this.numSteps === this.completedInstructionSteps;
  }
  
}

export default AjaxPreload;
