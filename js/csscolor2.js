function focusOnPropertyBox(){
  displayPropertyBox();
  document.getElementById("property_box").focus();
}

function focusOnValueBox(){
  displayValueBox();
  document.getElementById("value_box").focus();
}

function displayPropertyBox(){
  document.getElementById("property_span").hidden = "hidden";
  document.getElementById("property_box").hidden  = "";
}

function displayValueBox(){
  document.getElementById("value_span").hidden = "hidden";
  document.getElementById("value_box").hidden  = "";
}

function hidePropertyBox(){
  document.getElementById("property_span").hidden = "";
  document.getElementById("property_box").hidden  = "hidden";
}

function hideValueBox(){
  document.getElementById("value_span").hidden = "";
  document.getElementById("value_box").hidden  = "hidden";
}
