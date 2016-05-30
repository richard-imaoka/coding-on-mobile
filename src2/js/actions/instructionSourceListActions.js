export const SET_INSTRUCTION_SOURCE_LIST = 'SET_INSTRUCTION_SOURCE_LIST';

export function setInstructionSourceList( instructionSourceList ){
  return{ type: SET_INSTRUCTION_SOURCE_LIST, instructionSourceList: instructionSourceList };
}