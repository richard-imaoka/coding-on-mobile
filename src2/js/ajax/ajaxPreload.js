class AjaxPreload {

  constructor(callback ){
    this.HTML = "";
    this.CSS  = "";
    this.onFinishAjax = callback;

    this.ajaxHTML();
    this.ajaxCSS();
  }

  ajaxHTML() {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "sample.html", true);

    const self = this;
    ajax.onload = function () {
      self.HTML = ajax.responseText;
      if(self.isFinishedAjax())
        self.onFinishAjax();
    }
    ajax.send();
  }

  ajaxCSS() {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "sample.css", true);

    const self = this;
    ajax.onload = function () {
      self.CSS = ajax.responseText;
      if(self.isFinishedAjax())
        self.onFinishAjax();
    }
    ajax.send();
  }

  isFinishedAjax(){
    return this.CSS !== "" && this.HTML !== "";
  }

}

export default AjaxPreload;
