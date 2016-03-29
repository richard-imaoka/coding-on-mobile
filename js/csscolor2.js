var showSpan = function(event){
  var awesomElement = event.target.parentElement; //event's parentElement is <div class="awesomplete">
  var parentElement = awesomElement.parentElement;

  var spanElement = parentElement.children[0];
  spanElement.innerText = event.target.value;
  spanElement.removeAttribute("hidden");

  event.target.removeEventListener("blur", showSpan); //the below removeChild() calls onblur, so onblur is called twice otherwise
  parentElement.removeChild(awesomElement);

  //Draw the boxes and circles based in edited CSS
  document.getElementById("css-editor").dispatchEvent(new Event('draw'));
}

function keyPress(event){
  if(event.charCode === 13)
    event.target.dispatchEvent(new Event('change'));
}

function showInput(parentElement, awesomParams) {
  //Just exist if focus -> click on the same input element
  if (parentElement.children.length > 1)
    return;
  else {
    var spanElement = parentElement.children[0];
    spanElement.hidden = "hidden";

    /*
     * Create input Element
     */
    var inputElement = document.createElement("input");
    inputElement.addEventListener("blur", showSpan);
    inputElement.addEventListener("change", showSpan);
    inputElement.addEventListener("keypress", keyPress);
    inputElement.addEventListener("awesomplete-selectcomplete", showSpan);
    inputElement.className = "css-editor-input";
    inputElement.value = spanElement.innerText;
    inputElement.type = "search"; // show the "x" button for value deletion
    parentElement.appendChild(inputElement);
    var awesome = new Awesomplete(inputElement, awesomParams);
    awesome.evaluate();
    inputElement.focus();

  }
}

function showPropertyInput(parentElement) {
  showInput(parentElement, {list: properties, minChars: 0})
}

function showColorInput(parentElement) {
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

function addCSSLine(lastChild){

  //Create a following element and add it
  //
  //<div class="css-line css-editor-declaration">
  //  <div class="css-editor-indent"></div>
  //  <div class="css-editor-property animated infinite flash-background" onclick="showPropertyInput(this)">
  //    <span>background-color</span>
  //  </div>
  //  <div class="css-editor-colon">:</div>
  //  <div class="css-editor-value animated infinite flash-background" onclick="showColorInput(this)">
  //    <span>blue</span>
  //  </div>
  //  <div class="css-editor-semicolon">;</div>
  //</div>
  
  var cssLine = document.createElement("div");
  cssLine.className = "css-line css-editor-declaration";

  //  <div class="css-editor-indent"></div>
  var indent = document.createElement("div");
  indent.className = "css-editor-indent";
  cssLine.appendChild(indent);

  //  <div class="css-editor-property animated infinite flash-background" onclick="showPropertyInput(this)">
  //    <span>background-color</span>
  //  </div>
  var property = document.createElement("div");
  property.className = "css-editor-property animated infinite flash-background";
  property.addEventListener('click', function(){showPropertyInput(property);});
  var propertySpan = document.createElement("span");
  property.appendChild(propertySpan);
  cssLine.appendChild(property);

  //  <div class="css-editor-colon">:</div>
  var colon = document.createElement("div");
  colon.className = "css-editor-colon";
  colon.innerText = ":";
  cssLine.appendChild(colon);

  //  <div class="css-editor-value animated infinite flash-background" onclick="showColorInput(this)">
  //    <span>blue</span>
  //  </div>
  var value = document.createElement("div");
  value.className = "css-editor-value animated infinite flash-background";
  value.addEventListener('click', function(){showColorInput(value);});
  var valueSpan = document.createElement("span");
  value.appendChild(valueSpan);
  cssLine.appendChild(value);

  //  <div class="css-editor-semicolon">;</div>
  var colon = document.createElement("div");
  colon.className = "css-editor-colon";
  colon.innerText = ";";
  cssLine.appendChild(colon);

  //Then add it to the parent
  var parent = lastChild.parentNode;
  parent.insertBefore(cssLine, lastChild);
}

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
