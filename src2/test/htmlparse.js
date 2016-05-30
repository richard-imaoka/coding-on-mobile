import * as cssParser from 'css';
import prettyPrint from '../js/es6/prettyprint';
import { processCssData } from '../js/parsers/cssDataParser'


let ajax = new XMLHttpRequest();
ajax.open("GET", "sample.html", true);
ajax.onload = function () {

  const htmlSource = ajax.responseText;
  const parser     = new DOMParser();
  const doc        = parser.parseFromString(htmlSource, "text/html");
  let   html       = doc;


  //cssJSON.stylesheet.rules[2].declarations = assignBehaviorToArray( cssJSON.stylesheet.rules[2].declarations );

  //console.log(cssParser.stringify(processed));

  //console.log(cssParser.stringify(cssJSON));

  //const [ a, b ] = "behavior:option".split(",");
  //console.log( a, b );

}
ajax.send();

