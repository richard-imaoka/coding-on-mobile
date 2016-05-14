import { Map, List } from 'immutable'
import { instructionData }           from './instructionDataReducer'
import { instructionSourceList }     from './instructionSourceListReducer'
import { GOTO_STEP }                 from '../actions/stepActions'

export function instruction(state = Map({instructionData: {}, instructionSourceList: List(), instructionSource: ""}), action = undefined){

  switch(action.type) {
    case GOTO_STEP:
      const jsonSource = state.get("instructionSourceList").get(action.step);
      const data       = JSON.parse(jsonSource);
      return state.set("instructionData", data);
    default:
      //console.log("CSS: undefined action received", action);
      return state
        .set("instructionData",       instructionData(state.get("instructionData"),             action))
        .set("instructionSourceList", instructionSourceList(state.get("instructionSourceList"), action));
  }
}
