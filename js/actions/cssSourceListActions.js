export const SET_CSS_SOURCE_LIST = 'SET_CSS_SOURCE_LIST';

export function setCssSourceList( cssSourceList ){
  return{ type: SET_CSS_SOURCE_LIST, cssSourceList: cssSourceList };
}