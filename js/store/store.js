import { createStore } from 'redux'
import * as css from 'css'
import { combined }    from '../reducers/combinedReducer'

const store = createStore(combined);

store.getSource = function(){

  const htmlString = store.getState().htmlText;
  const cssString  = css.stringify(store.getState().css.toJS());
  const src        = htmlString.replace('</head>', '<style>' + cssString + '</style></head>');

  return src;
};

export default store;
