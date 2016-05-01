export const SET_PROGRESS = 'SET_PROGRESS';

export function setProgress( currentStep, totalSteps ){
  return{ type: SET_PROGRESS, currentStep: currentStep, totalSteps: totalSteps };
}