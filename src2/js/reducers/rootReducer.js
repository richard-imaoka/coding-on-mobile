import { Map }             from 'immutable'
import { html }            from './htmlReducer'
import { css }             from './cssReducer'
import { instruction }     from './instructionReducer'
import { navigation }      from './navigationReducer'
import { popup }           from './popupEditorReducer'
import { slideUp }         from './slideUpEditorReducer'
import { setProgress }     from '../actions/navigationActions'
import { NEXT_STEP, PREV_STEP, GOTO_STEP, gotoStep } from '../actions/stepActions'
import { SET_HTML_SOURCE_LIST } from '../actions/htmlSourceListActions'
import { SET_CSS_SOURCE_LIST }  from '../actions/cssSourceListActions'
import { SET_INSTRUCTION_SOURCE_LIST }  from '../actions/instructionSourceListActions'

export function root(state = { currentStep: 1, totalSteps: 1, html: Map(), css: Map(), /*instruction: Map(),*/ navigation: {}, slideUp: {}, popup: {} }, action = undefined){
  switch(action.type) {
    case NEXT_STEP:
      console.debug("action received", action);

      if(state.currentStep >= state.totalSteps){
        console.info("Not going to the next step: Total steps = ", state.totalSteps, ", Current step = ", state.currentStep, " already."  );
        return state;
      }
      else{
        const nextStep = state.currentStep + 1;
        return {
          currentStep: nextStep,
          totalSteps:  state.totalSteps,
          navigation:  navigation( state.navigation, setProgress(nextStep, state.totalSteps) ),

          html:        html( state.html, gotoStep(nextStep) ),
          css:         css(  state.css,  gotoStep(nextStep) ),
          //instruction: instruction( state.instruction, gotoStep(nextStep) ),

          slideUp:     slideUp(state.slideUp, action ),
          popup:       popup(state.popup,   action )
        };
      }

    case PREV_STEP:
      console.debug("action received", action);

      if(state.currentStep <= 1 ){
        console.debug("Not going to the prev step: Current step = ", state.currentStep, " is the minimum." );
        return state;
      }
      else{
        const prevStep = state.currentStep - 1;
        return {
          currentStep: prevStep,
          totalSteps:  state.totalSteps,
          navigation:  navigation( state.navigation, setProgress(prevStep, state.totalSteps) ),

          html:        html( state.html, gotoStep(prevStep) ),
          css:         css(  state.css,  gotoStep(prevStep) ),
          //instruction: instruction( state.instruction, gotoStep(prevStep) ),

          slideUp:     slideUp(state.slideUp, action ),
          popup:       popup(state.popup,   action )
        };
      }

    case GOTO_STEP:
      console.debug("action received", action);

      if( action.step < 1) {
        console.debug("Not GOTO to step = ", action.step, " as it is less than 1" );
        return state;
      }
      else if ( state.totalSteps <= action.step ) {
        console.debug("Not GOTO to step = ", action.step, " as it is greater than totalSteps = ", state.totalSteps );
        return state;
      }
      else{
        return {
          currentStep: action.step,
          totalSteps:  state.totalSteps,
          navigation:  navigation( state.navigation, setProgress(action.step, state.totalSteps) ),

          html:        html( state.html, action ),
          css:         css(  state.css,  action ),
          //instruction: instruction( state.instruction, action ),

          slideUp:     slideUp(state.slideUp, action ),
          popup:       popup(state.popup,   action )
        };
      }

    case SET_HTML_SOURCE_LIST:
      const htmlState = html( state.html,  action );
      return {
        html:        htmlState,

        currentStep: state.currentStep,
        totalSteps:  htmlState.get("htmlSourceList").size - 1,

        css:         css( state.css, action ),
        //instruction: instruction( state.instruction, action ),
        navigation:  navigation( state.navigation, action ),
        slideUp:     slideUp(state.slideUp, action ),
        popup:       popup(state.popup,   action )
      };

    case SET_CSS_SOURCE_LIST:
      const cssState = css( state.css,  action );
      return {
        css:         cssState,

        currentStep: state.currentStep,
        totalSteps:  cssState.get("cssSourceList").size - 1,

        html:        html( state.html, action ),
        //instruction: instruction( state.instruction, action ),
        navigation:  navigation( state.navigation, action ),
        slideUp:     slideUp(state.slideUp, action ),
        popup:       popup(state.popup,   action )
      };

    case SET_INSTRUCTION_SOURCE_LIST:
      const instructionState = instruction( state.instruction,  action );
      return {
        //instruction: instructionState,

        currentStep: state.currentStep,
        totalSteps:  instructionState.get("instructionSourceList").size - 1,

        html:        html( state.html, action ),
        css:         css( state.css, action ),
        navigation:  navigation( state.navigation, action ),
        slideUp:     slideUp(state.slideUp, action ),
        popup:       popup(state.popup,   action )
      };

    default:
      return {
        currentStep: state.currentStep,
        totalSteps:  state.totalSteps,
        html:        html( state.html, action ),
        css:         css(  state.css,  action ),
        //instruction: instruction( state.instruction, action ),
        navigation:  navigation( state.navigation, action ),
        slideUp:     slideUp(state.slideUp, action ),
        popup:       popup(state.popup, action )
      };
  }
}