/**
 * Created by nishyu on 4/28/2016.
 */
class AjaxPreload {

  constructor(numSteps){
    this.HTMLs = [];
    this.CSSs  = {};
    this.completedHTMLSteps = 0;
    this.completedCSSSteps = 0;
    this.numSteps = numSteps;

    for(var i=1; i<=numSteps; i++){
      this.ajaxCall(i, ".html");
      this.ajaxCall(i, ".css");
    }
  }

  ajaxCall(i, suffix) {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "sample" + i + suffix, true);

    const self = this;
    ajax.onload = function () {
      if(suffix === ".html")
        self.completedHTMLSteps++;
      else
        self.completedCSSSteps++;

      self.HTMLs[i] = ajax.responseText;
      if(self.isFinishedAjax())
        self.onFinishAjax();
    }
    ajax.send();
  }

  isFinishedAjax(){
    return this.numSteps === this.completedHTMLSteps && this.numSteps === this.completedCSSSteps;
  }

  onFinishAjax(){
    //notify the HTML that it's done
    console.log("completed. yeaaahhhh!!!!");
  }



}

export default AjaxPreload;

//AjaxPreload.get(COLORS)
//AjaxPreload.getHTML(1)
//AjaxPreload.getCSS(2)