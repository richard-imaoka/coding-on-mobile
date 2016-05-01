export const NEXT_STEP = 'NEXT_STEP';
export const PREV_STEP = 'PREV_STEP';
export const SET_TOTAL_STEPS = 'SET_TOTAL_STEPS';

export function nextStep(){
  return{ type: NEXT_STEP };
}

export function prevStep(){
  return{ type: PREV_STEP };
}

export function setTotalSteps( totalSteps ){
  return{ type: SET_TOTAL_STEPS, totalSteps: totalSteps };
}