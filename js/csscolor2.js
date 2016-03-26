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
