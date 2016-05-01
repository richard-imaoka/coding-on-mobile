import { NEXT_STEP, PREV_STEP, SET_TOTAL_STEPS } from '../actions/navigationActions'


export function navigation(state = { currentStep: 0, totalSteps: 1 }, action = undefined){
  switch(action.type) {
    case NEXT_STEP:
      console.debug("action received", action);
      if(state.currentStep >= state.totalSteps){
        console.info("Not going to the next step: Total steps = ", state.totalSteps, ", Current step = ", state.currentStep, " already."  );
        return state;
      }
      else
        return { currentStep: state.currentStep + 1, totalSteps: state.totalSteps };
    case PREV_STEP:
      if(state.currentStep <= 0 ){
        console.debug("Not going to the prev step: Current step = ", state.currentStep  );
        return state;
      }
      else
        return { currentStep: state.currentStep - 1, totalSteps: state.totalSteps };
    case SET_TOTAL_STEPS:
      console.debug("action received", action);
      return { currentStep: state.currentStep,     totalSteps: action.totalSteps };
    default:
      //console.log("HTML: undefined action received", action);
      return state;
  }
}