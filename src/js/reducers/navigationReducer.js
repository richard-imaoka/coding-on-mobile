import { SET_PROGRESS } from '../actions/navigationActions'

export function navigation(state = { progress: 0 }, action = undefined){
  switch(action.type) {
    case SET_PROGRESS:
      return { progress: Math.round( ( action.currentStep - 1 ) / ( action.totalSteps - 1 ) * 100 ) };
    default:
      //console.log("HTML: undefined action received", action);
      return state;
  }
}