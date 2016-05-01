import { createStore } from 'redux'
import * as css from 'css'
import { combined }    from '../reducers/combinedReducer'

const store = createStore(combined);

store.getHtmlData = function() {
  return store.getState().html.children;
}

store.getHtmlSource = function(){
  return store.getState().html._Source;
}

store.getCssData = function(){
  return store.getState().css.toJS().stylesheet;
}

store.getCssSource = function(){
  return css.stringify(store.getState().css.toJS());
}

store.getSource = function() {
  const  htmlString = store.getHtmlSource();
  const  src        = htmlString.replace('</head>', '<style>' + store.getCssSource() + '</style></head>');
  return src;
};

export default store;
