import { NEXT_STEP, PREV_STEP, SET_TOTAL_STEPS } from '../actions/navigationActions'


export function navigation(state = { currentStep: 0, totalSteps: 1 }, action = undefined){
  switch(action.type) {
    case NEXT_STEP:
      console.log("action received", action);
      return { currentStep: state.currentStep + 1, totalSteps: state.totalSteps };
    case PREV_STEP:
      console.log("action received", action);
      return { currentStep: state.currentStep - 1, totalSteps: state.totalSteps };
    case SET_TOTAL_STEPS:
      console.log("action received", action);
      return { currentStep: state.currentStep,     totalSteps: action.totalSteps };
    default:
      //console.log("HTML: undefined action received", action);
      return state;
  }
}