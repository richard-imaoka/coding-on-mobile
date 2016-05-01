import { createStore } from 'redux'
import * as css from 'css'
import { root }    from '../reducers/rootReducer'

const store = createStore(root);

store.getHtmlData = function() {
  return store.getState().html.get("htmlData").children;
}

store.getHtmlSource = function(){
  const state      = store.getState();
  const htmlSource = state.html.get("htmlSource");

  if( htmlSource === undefined )
    return ""
  else
    return htmlSource;
}

store.getCssData = function(){
  return store.getState().css.get("cssData").toJS().stylesheet;
}

store.getCssSource = function(){
  const state   = store.getState();
  const cssData = state.css.get("cssData");
  if( !cssData.size )
    return "";
  else
    return css.stringify( cssData.toJS() );
}

store.getSource = function() {
  const  htmlString = store.getHtmlSource();
  const  src        = htmlString.replace('</head>', '<style>' + store.getCssSource() + '</style></head>');
  return src;
};

store.getProgress = function() {
  return store.getState().navigation.progress;
}

export default store;
