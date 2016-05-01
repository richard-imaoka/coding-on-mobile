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

export default store;
