import { createStore } from 'redux'
import * as css from 'css'
import root     from '../reducers/rootReducer'

const store = createStore(root);

store.getHtmlData = function() {
  return store.getState().html.get("htmlData");
};

store.getHtmlSource = function(){
  const state      = store.getState();
  const htmlSource = state.html.get("htmlSource");

  if( htmlSource === undefined )
    return "";
  else
    return htmlSource;
};

store.getCssData = function(){
  const state   = store.getState();
  const cssData = state.css;
  return cssData;
};

store.getCssSource = function(){
  const cssData = store.getCssData();
  if( cssData.size === 0 )
    return "";
  else
    return css.stringify( cssData.toJS() );
};

store.getSource = function() {
  const  htmlString = store.getHtmlSource();
  const  src        = htmlString.replace('</head>', '<style>' + store.getCssSource() + '</style></head>');
  return src;
};

export default store;
