export const NEXT_STEP = 'NEXT_STEP';
export const PREV_STEP = 'PREV_STEP';
export const SET_TOTAL_STEPS = 'SET_TOTAL_STEPS';
export const GOTO_STEP = 'GOTO_STEP';

export function nextStep(){
  return{ type: NEXT_STEP };
}

export function prevStep(){
  return{ type: PREV_STEP };
}

export function setTotalSteps( totalSteps ){
  return{ type: SET_TOTAL_STEPS, totalSteps: totalSteps };
}

export function gotoStep( step ){
  return{ type: GOTO_STEP, step: step };
}