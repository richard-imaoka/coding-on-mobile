var showSpan = function(parentElement){
  parentElement.removeChild(parentElement.children[1]);
  var spanElement = parentElement.children[0];
  spanElement.removeAttribute("hidden");

}

function showInput(parentElement, awesomParams){
  //Just exist if focus -> click on the same input element
  if(parentElement.children.length > 1)
    return;
  else {
    var inputElement = document.createElement("input");
    inputElement.addEventListener("blur", function(){ showSpan(parentElement); });
    inputElement.className = "css-editor-input";
    parentElement.appendChild(inputElement);
    new Awesomplete(inputElement, awesomParams);

    var spanElement = parentElement.children[0];
    spanElement.hidden = "hidden";

    inputElement.focus();
  }
}

function showProperty(parentElement){
  showInput(parentElement, { list: properties, minChars: 1 } )
}

function showColor(parentElement){
  showInput(parentElement, { list: colors, minChars: 1 } )
}

var colorAjax = new XMLHttpRequest();
var colors = "";
colorAjax.open("GET", "data/awesomplete-colors.json", true);
colorAjax.onload = function() {
  colors = JSON.parse(colorAjax.responseText);
};
colorAjax.send();

var propertyAjax = new XMLHttpRequest();
var properties = "";
propertyAjax.open("GET", "data/awesomplete-properties.json", true);
propertyAjax.onload = function() {
  properties = JSON.parse(propertyAjax.responseText);
};
propertyAjax.send();