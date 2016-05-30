import * as cssParser from 'css';
import prettyPrint from '../js/es6/prettyprint';
import { processCssData } from '../js/parsers/cssDataParser'


let ajax = new XMLHttpRequest();
ajax.open("GET", "sample.css", true);
ajax.onload = function () {
  const  cssSource = ajax.responseText;
  const  cssJSON   = cssParser.parse(cssSource);

  let b = {};
  cssJSON.stylesheet.rules.forEach(a => {
    b[a.type] = 1;
  });
  
  console.log(b);
  
  //cssJSON.stylesheet.rules[2].declarations = assignBehaviorToArray( cssJSON.stylesheet.rules[2].declarations );
  let processed = processCssData(cssJSON);
  //prettyPrint(processed);

  //console.log(cssParser.stringify(processed));

  //console.log(cssParser.stringify(cssJSON));

  //const [ a, b ] = "behavior:option".split(",");
  //console.log( a, b );

}
ajax.send();

