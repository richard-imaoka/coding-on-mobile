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

var write_iframe = function(iframe_id, src){
  var iframe = document.getElementById(iframe_id);
  iframe_doc = iframe.contentDocument;
  iframe_doc.open();
  iframe_doc.write(src);
  iframe_doc.close();
}

var render = function(inside_html, css_tpl, iframe_id, code_id, custom_css) {

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

  var html = html_base_tpl.replace('</body>', inside_html + '</body>');

  var css = css_tpl + custom_css;

  var css_elem = document.getElementById(code_id);
  css_elem.innerText = custom_css;

  var src = html.replace('</head>', '<style>' + css + '</style></head>');

  write_iframe(iframe_id, src);
  Prism.highlightElement(css_elem);
}


var updateColor = function( color, iframe_id, code_id ){
  var html_box =
      "  <div class='box'>" + color +"</div>";

  var custom_css =
      ".box {\n" +
      "  background-color: " + color + ";\n" +
      "}\n";

  render(html_box, css_tpl, iframe_id, code_id, custom_css);
}

var extract_hex_color = function(text){
  var split   = text.split(",");
  var color   = split[0];

  return color;
}
