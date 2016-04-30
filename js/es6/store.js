import React from 'react'
import ReactDOM  from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import cssReducer from './reducers'
import { Map, List, fromJS } from 'immutable'
import * as css from 'css'
import prettyPrint from './prettyprint'
import { CSSApp } from './CssEditor'
import { HTMLNode } from './HtmlEditor'

let htmlString;// = document.getElementById("template").innerHTML;
let store;

function render(iframe, src){
  console.log("src-----------------begin");
  console.log(src);
  console.log("src-----------------end");
  let iframe_doc = iframe.contentDocument;
  iframe_doc.open();
  iframe_doc.write(src);
  iframe_doc.close();
}

let ReactRender = function(element, store){
  console.log("re render");
  ReactDOM.render( <CSSApp store={store} obj={store.getState().toJS().stylesheet}></CSSApp>, element );

  let cssString  = css.stringify(store.getState().toJS());
  let src = htmlString.replace('</head>', '<style>' + cssString + '</style></head>');
  let iframe = document.getElementById("result");
  render(iframe, src);
}

var ajax = new XMLHttpRequest();
ajax.open("GET", "data/sample.css", true);
ajax.onload = function () {
  var cssJSON= css.parse(ajax.responseText);
  store = createStore(cssReducer, fromJS(cssJSON));
  //prettyPrint(store.getState())
  store.subscribe(() => ReactRender(store));
  ReactRender(document.getElementById('example'), store);
};
ajax.send();

var ajax4 = new XMLHttpRequest();
ajax4.open("GET", "data/sample.html", true);
let self = this;
ajax4.onload = function () {
  htmlString = ajax4.responseText;
  var parser = new DOMParser();
  var doc    = parser.parseFromString(ajax4.responseText, "text/html");
  var html   = doc.children[0];
  ReactDOM.render(
    <HTMLNode children={html.children} tagName={"html"} textContent={"dummy"}></HTMLNode>,
    document.getElementById('hhhh')
  );
}
ajax4.send();


