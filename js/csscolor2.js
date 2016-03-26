function showInput(spanElement){
  var spanId = spanElement.id;
  var inputId  = spanId.replace("span", "input");

  document.getElementById(spanId).hidden = "hidden";
  document.getElementById(inputId).hidden  = "";

  document.getElementById(inputId).focus();
}

function showSpan(inputElement){
  var inputId  = inputElement.id;
  var spanId = inputId.replace("input", "span");

  document.getElementById(spanId).hidden = "";
  document.getElementById(inputId).hidden  = "hidden";
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