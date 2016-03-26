function showInput(spanElement){
  var spanId = spanElement.id;
  var boxId  = spanId.replace("span", "box");

  document.getElementById(spanId).hidden = "hidden";
  document.getElementById(boxId).hidden  = "";

  document.getElementById(boxId).focus();
}

function showSpan(inputElement){
  var boxId  = inputElement.id;
  var spanId = boxId.replace("box", "span");

  document.getElementById(spanId).hidden = "";
  document.getElementById(boxId).hidden  = "hidden";
}
