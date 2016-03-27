var showSpan = function(event){
  var awesomElement = event.target.parentElement;
  var parentElement = awesomElement.parentElement; //event's parentElement is <div class="awesomplete">

  var spanElement = parentElement.children[0];

  if(event.target.value !== "")
    spanElement.innerText = event.target.value;

  spanElement.removeAttribute("hidden");

  event.target.removeEventListener("blur", showSpan); //the below removeChild() calls onblur, so onblur is called twice otherwise
  parentElement.removeChild(awesomElement);
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
  showInput(parentElement, {list: colors, minChars: 0, item: colorElement})
}

function showSelector(parentElement) {
  var selectors = [ ".box", "circle", "#box1", "#box2", "#box3", "#circle1", "#circle2", "#circle3" ];
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

function recursive(element) {

  if (element.className.includes("css-line"))
    console.log(element.innerText.replace(/\n/g, " ") + "\n");

  for (var i = 0; i < element.children.length; i++) {
    var child = element.children[i];
    recursive(child);
  }
}