import * as cssParser from 'css'
import { Map, List, fromJS } from 'immutable'
import { cssDataReducer }    from './cssDataReducer'
import { cssSourceList }     from './cssSourceListReducer'
import { GOTO_STEP }         from '../actions/stepActions'

export function css(state = Map({cssData: Map(), cssSourceList: List()}), action = undefined){

  switch(action.type) {
    case GOTO_STEP:
      const  cssSource = state.get("cssSourceList").get(action.step);
      const  cssJSON   = cssParser.parse(cssSource);
      return state.set("cssData", fromJS(cssJSON));
    default:
      //console.log("CSS: undefined action received", action);
      return state
        .set("cssData",       cssDataReducer(state.get("cssData"),      action))
        .set("cssSourceList", cssSourceList(state.get("cssSourceList"), action));
  }
}
