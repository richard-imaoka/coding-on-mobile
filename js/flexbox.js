var css_tpl =
  "body {\n" +
  "  margin: 0px;\n" +
  "}\n" +
  "\n" +
  ".flex-container-base {\n"+
  "  padding-top:    1px;\n"+
  "  padding-bottom: 1px;\n"+
  "  padding-left:   0px;\n"+
  "  padding-right:  0px;\n"+
  "  margin: 0px;\n"+
  "  list-style: none;\n"+
  //"  justify-content: space-around;\n"+
  "}\n"+
  "\n"+
  ".flex-item-base {\n"+
  "  background: tomato;\n"+
  "  padding: 5px;\n"+
  "  width: 30px;\n"+
  "  height: 50px;\n"+
  "  margin: 10px;\n"+
  "  line-height: 50px;\n"+
  "  color: white;\n"+
  "  font-weight: bold;\n"+
  "  font-size: 3em;\n"+
  "  text-align: center;\n"+
  "}\n" +
  "\n";

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

var html_boxes =
"  <ul class='container flex-container-base'>\n" +
"    <li class='flex-item-base'>1</li>\n" +
"    <li class='flex-item-base'>2</li>\n" +
"    <li class='flex-item-base'>3</li>\n" +
"    <li class='flex-item-base'>4</li>\n" +
"    <li class='flex-item-base'>5</li>\n" +
"    <li class='flex-item-base'>6</li>\n" +
"  </ul>\n";


var css_declaration = function(css_property, css_value){
  return css_property + ": " + css_value + ";";
};

var css_container_rule = function(css_property, css_value){
  return ".container {\n" +
      "  display: flex;\n" +
      "  " + css_declaration(css_property, css_value) + "\n" +
      "}\n";
};

var write_iframe = function(iframe_id, src){
  var iframe = document.getElementById(iframe_id);
  iframe_doc = iframe.contentDocument;
  iframe_doc.open();
  iframe_doc.write(src);
  iframe_doc.close();
}

var renderA = function(iframe_id, flex_css_property, select_id) {
  var html = html_base_tpl.replace('</body>', html_boxes + '</body>');

  var flex_select_element = document.getElementById(select_id);
  var flex_select_idx = flex_select_element.selectedIndex;
  var flex_css_value  = flex_select_element.options[flex_select_idx].text;
  var css = '<style>' + css_tpl + css_container_rule(flex_css_property, flex_css_value)  + '</style>';

  var src = html.replace('</head>', css + '</head>');

  write_iframe(iframe_id, src);
}

var render = function() {
    var html = html_base_tpl.replace('</body>', html_boxes + '</body>');

    var css_element = document.getElementById('css_code');
    var css_code = css_element.innerText;
    var css = '<style>' + css_tpl + css_code  + '</style>';

    var src = html.replace('</head>', css + '</head>');

    write_iframe('output iframe', src);
};

var render_align_content = function() {
  var html_boxes2 =
   "<div style='width:100%;background-color:purple'>\n" +
   "  <ul class='container flex-container-base' style='height: 300px'>\n" +
   "    <li class='flex-item-base' style='order: 1'>1</li>\n" +
   "    <li class='flex-item-base' style='order: 2'>2</li>\n" +
   "    <li class='flex-item-base' style='order: 3'>3</li>\n" +
   "    <li class='flex-item-base' style='order: 4'>4</li>\n" +
   "    <li class='flex-item-base' style='order: 5'>5</li>\n" +
   "    <li class='flex-item-base' style='order: 6'>6</li>\n" +
   "  </ul>\n" +
   "</div>\n";

  var html = html_base_tpl.replace('</body>', html_boxes2 + '</body>');

  var flex_select_element = document.getElementById('flex-align-content-select');
  var flex_select_idx = flex_select_element.selectedIndex;
  var flex_css_value  = flex_select_element.options[flex_select_idx].text;

  var css_element = document.getElementById('css_code7');
  var css_code = css_element.innerText;
  var css = '<style>' + css_tpl + css_code.replace('align-content: ', "align-content: " + flex_css_value)  + '</style>';

  var src = html.replace('</head>', css + '</head>');

  write_iframe('output iframe7', src);
}


var render_order_item = function(){
  var order = document.getElementById('order-select').value;

   var html_boxes2 =
    "<div style='width:100%;background-color:purple'>\n" +
    "  <ul class='container flex-container-base'>\n" +
    "    <li class='flex-item-base' style='order: 1'>1</li>\n" +
    "    <li class='flex-item-base' style='order: 2'>2</li>\n" +
    "    <li class='flex-item-base' style='order: 3'>3</li>\n" +
    "    <li class='flex-item-base item' style='background-color:yellow; color: blue'>" + order  + "</li>\n" +
    "    <li class='flex-item-base' style='order: 4'>4</li>\n" +
    "    <li class='flex-item-base' style='order: 5'>5</li>\n" +
    "    <li class='flex-item-base' style='order: 6'>6</li>\n" +
    "  </ul>\n" +
    "</div>\n";

    var html = html_base_tpl.replace('</body>', html_boxes2 + '</body>');

    var css_element = document.getElementById('css_code8');
    var css_code = css_element.innerText;
    var css = '<style>' + css_tpl + css_code.replace("order: ", "order: " + order)  + '</style>';


    var src = html.replace('</head>', css + '</head>');

    write_iframe('output iframe8', src);
}

var render_grow_item = function(){
  var grow = document.getElementById('flex-grow-select').value;

   var html_boxes2 =
    "<div style='width:100%;background-color:purple'>\n" +
    "  <ul class='container flex-container-base'>\n" +
    "    <li class='flex-item-base'      style='flex-grow: 1'>1</li>\n" +
    "    <li class='flex-item-base item' style='background-color:yellow; color: blue'>" + grow  + "</li>\n" +
    "    <li class='flex-item-base'      style='flex-grow: 1'>1</li>\n" +
    "  </ul>\n" +
    "</div>\n";

    var html = html_base_tpl.replace('</body>', html_boxes2 + '</body>');

    var css_element = document.getElementById('css_code9');
    var css_code = css_element.innerText;
    var css = '<style>' + css_tpl + css_code.replace("flex-grow: ", "flex-grow: " + grow)  + '</style>';


    var src = html.replace('</head>', css + '</head>');

    write_iframe('output iframe9', src);
}

var render_basis_item = function(){
  var basis_element = document.getElementById('flex-basis-select');
  var basis_idx = basis_element.selectedIndex;
  var basis     = basis_element.options[basis_idx].text;

   var html_boxes2 =
    "<div style='width:100%;background-color:purple'>\n" +
    "  <ul class='container flex-container-base'>\n" +
    "    <li class='flex-item-base'      style='flex-basis: 1'>1</li>\n" +
    "    <li class='flex-item-base item' style='background-color:yellow; color: blue'>" + basis  + "</li>\n" +
    "    <li class='flex-item-base'      style='flex-basis: 1'>1</li>\n" +
    "  </ul>\n" +
    "</div>\n";

    var html = html_base_tpl.replace('</body>', html_boxes2 + '</body>');

    var css_element = document.getElementById('css_code10');
    var css_code = css_element.innerText;
    var css = '<style>' + css_tpl + css_code.replace("flex-basis: ", "flex-basis: " + basis)  + '</style>';

    var src = html.replace('</head>', css + '</head>');

    write_iframe('output iframe10', src);
}

var render_item_flex = function(){
  var flex_text = document.getElementById('item-flex-select').value;

   var html_boxes2 =
    "<div style='width:100%;background-color:purple'>\n" +
    "  <ul class='container flex-container-base'>\n" +
    "    <li class='flex-item-base'      style='flex-grow: 1'>1</li>\n" +
    "    <li class='flex-item-base item' style='background-color:yellow; color: blue'>" + flex_text  + "</li>\n" +
    "    <li class='flex-item-base'      style='flex-grow: 1'>1</li>\n" +
    "  </ul>\n" +
    "</div>\n";

    var html = html_base_tpl.replace('</body>', html_boxes2 + '</body>');

    var css_element = document.getElementById('css_code11');
    var css_code = css_element.innerText;
    var css = '<style>' + css_tpl + css_code.replace("flex: ", "flex: " + flex_text)  + '</style>';

    var src = html.replace('</head>', css + '</head>');

    write_iframe('output iframe11', src);
}


var render_align_self = function(){
  var align_self_element = document.getElementById('flex-align-self-select');
  var align_self_idx = align_self_element.selectedIndex;
  var align_self     = align_self_element.options[align_self_idx].text;

   var html_boxes2 =
    "<div style='width:100%;background-color:purple'>\n" +
    "  <ul class='container flex-container-base' style='height:150px'>\n" +
    "    <li class='flex-item-base item'>1</li>\n" +
    "    <li class='flex-item-base item'>1</li>\n" +
    "    <li class='flex-item-base item'>1</li>\n" +
    "  </ul>\n" +
    "</div>\n";

    var html = html_base_tpl.replace('</body>', html_boxes2 + '</body>');

    var css_element = document.getElementById('css_code12');
    var css_code = css_element.innerText;
    var css = '<style>' + css_tpl + css_code.replace("align-self: ", "align-self: " + align_self)  + '</style>';

    var src = html.replace('</head>', css + '</head>');

    write_iframe('output iframe12', src);
}
