import { createStore } from 'redux'
import css from './reducers'
import { Map, fromJS } from 'immutable'


var ajax = new XMLHttpRequest();
ajax.open("GET", "data/sample.css", true);
ajax.onload = function () {
  var cssJSON= CSSJSON.toJSON(ajax.responseText);
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

      let store = createStore(css, fromJS(cssJSON));

      riot.mount('css-editor',
        {
          property_list: properties,
          value_list: colors,
          store: store
        }
      )
    };
    ajax2.send();
  };
  ajax1.send();
};
ajax.send();