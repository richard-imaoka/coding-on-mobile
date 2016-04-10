import React from 'react'
import ReactDOM  from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import cssReducer from './reducers'
import { Map, fromJS } from 'immutable'
import * as css from 'css'
import prettyPrint from './prettyprint'
import { CSSRule, CSSValue, CSSDeclaration, InputBox } from './CssEditor'
import { HTMLNode } from './HtmlEditor'


var ajax = new XMLHttpRequest();
ajax.open("GET", "data/sample.css", true);
ajax.onload = function () {
  var cssJSON= css.parse(ajax.responseText);
  var ajax1 = new XMLHttpRequest();
  var properties = "";
  ajax1.open("GET", "data/awesomplete-properties.json", true);
  ajax1.onload = function () {
    properties = JSON.parse(ajax1.responseText);
    var ajax2 = new XMLHttpRequest();
    var colors = "";
    ajax2.open("GET", "data/awesomplete-colors.json", true);
    ajax2.onload = function () {
      colors = JSON.parse(ajax2.responseText);

      let store = createStore(cssReducer, fromJS(cssJSON).get("stylesheet"));

      //prettyPrint(store.getState())

      let item = function(text, input) {
        let split = text.split(",");
        let colorHex = split[0]
        let colorName = split[split.length - 1];
        let element = document.createElement("li");
        element.innerHTML = colorHex + " " + colorName;
        element.style.backgroundColor = colorHex;
        return element;
      }

      ReactDOM.render(
        <CSSRule obj={cssJSON.stylesheet.rules[0]}></CSSRule>,
        document.getElementById('example')
      );
      //riot.mount('css-editor',
      //  {
      //    property_list: properties,
      //    value_list: colors,
      //    store: store
      //  }
      //)
    };
    ajax2.send();
  };
  ajax1.send();
};
ajax.send();



var ajax4 = new XMLHttpRequest();
ajax4.open("GET", "data/sample.html", true);
let self = this;
ajax4.onload = function () {
  var parser = new DOMParser();
  var doc    = parser.parseFromString(ajax4.responseText, "text/html");
  var html   = doc.children[0];
  ReactDOM.render(
    <HTMLNode children={html.children} tagName={"html"} textContent={"dummy"}></HTMLNode>,
    document.getElementById('hhhh')
  );
}
ajax4.send();