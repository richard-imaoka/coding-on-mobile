var showSpan = function(event){
  var awesomElement = event.target.parentElement;
  var parentElement = awesomElement.parentElement; //event's parentElement is <div class="awesomplete">

  var spanElement = parentElement.children[0];

  if(event.target.value !== "")
    spanElement.innerText = event.target.value;

  spanElement.removeAttribute("hidden");

  event.target.removeEventListener("blur", showSpan); //the below removeChild() calls onblur, so onblur is called twice otherwise
  parentElement.removeChild(awesomElement);

  document.getElementById("css-editor").dispatchEvent(new Event('draw'));
}

function showInput(parentElement, awesomParams) {
  //Just exist if focus -> click on the same input element
  if (parentElement.children.length > 1)
    return;
  else {
    var spanElement = parentElement.children[0];
    spanElement.hidden = "hidden";

    var inputElement = document.createElement("input");

    inputElement.addEventListener("blur", showSpan);
    inputElement.addEventListener("change", showSpan);
    inputElement.addEventListener("awesomplete-selectcomplete", showSpan);

    inputElement.className = "css-editor-input";
    inputElement.placeholder = spanElement.innerText;
    parentElement.appendChild(inputElement);
    var awesome = new Awesomplete(inputElement, awesomParams);

    awesome.evaluate();
    awesome.next();
    inputElement.focus();
  }
}

function showProperty(parentElement) {
  showInput(parentElement, {list: properties, minChars: 0})
}

function showColor(parentElement) {
  showInput(parentElement, {list: colors, maxItems: colors.length, minChars: 0, item: colorElement})
}

function showSelector(parentElement) {
  var selectors = [ "#box1", "#box2", "#box3", "#circle1", "#circle2", "#circle3" ];
  showInput(parentElement, {list: selectors, minChars: 0})
}


function colorElement(text, input) {
  var split = text.split(",");
  var colorHex = split[0]
  var colorName = split[split.length - 1];
  var element = document.createElement("li");
  element.innerHTML = colorHex + " " + colorName;
  element.style.backgroundColor = colorHex;
  return element;
};

var colorAjax = new XMLHttpRequest();
var colors = "";
colorAjax.open("GET", "data/awesomplete-colors.json", true);
colorAjax.onload = function () {
  colors = JSON.parse(colorAjax.responseText);
};
colorAjax.send();

var propertyAjax = new XMLHttpRequest();
var properties = "";
propertyAjax.open("GET", "data/awesomplete-properties.json", true);
propertyAjax.onload = function () {
  properties = JSON.parse(propertyAjax.responseText);
};

propertyAjax.send();


function getCSS(rootElement){

  var output = "";

  function recursive(element) {

    if (element.className.includes("css-line"))
      output += element.innerText.replace(/\n/g, " ") + "\n";

    for (var i = 0; i < element.children.length; i++) {
      var child = element.children[i];
      recursive(child);
    }
  }

  recursive(rootElement);

  return output;

}


var write_iframe = function(iframe_id, src){
  var iframe = document.getElementById(iframe_id);
  iframe_doc = iframe.contentDocument;
  iframe_doc.open();
  iframe_doc.write(src);
  iframe_doc.close();
}

var update_iFrame = function(inside_html, css, iframe_id ) {

  var html_base_tpl =
    "<!doctype html>\n" +
    "<html>\n\t" +
    "<head>\n\t\t" +
    "<meta charset=\"utf-8\">\n\t\t" +
    "<title>Test</title>\n\n\t\t\n\t" +
    "</head>\n\t" +
    "<body>\n\t\n\t" +
    "</body>\n" +
    "</html>";

  var css_tpl =
    ".container {\n" +
    "  display: flex;\n" +
    "}\n" +
    "\n" +
    ".text-center {\n" +
    "  display: flex;\n" +
    "  font-size: 40px;\n" +
    "  text-shadow: 2px 2px Gray;\n" +
    "  color: white;\n" +
    "  align-items: center;\n" +
    "  justify-content: center;\n" +
    "}\n" +
    "\n";

  var innerHTML = document.getElementById("template").innerHTML;

  var css = css_tpl + css;
  
  var html = html_base_tpl.replace('</body>', inside_html + '</body>');

  var src = html.replace('</head>', '<style>' + css + '</style></head>');

  write_iframe(iframe_id, src);
}

function render(){
  var innerHTML = document.getElementById("template").innerHTML;
  var cssElem   = document.getElementById("css-editor");
  var css       = getCSS(cssElem);
  update_iFrame(innerHTML, css, "result");
}

render();

var editor = document.getElementById("css-editor");
editor.addEventListener("draw", render );
