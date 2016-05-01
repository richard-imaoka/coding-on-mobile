// import { combineReducers } from 'redux'
// import { html }            from './htmlReducer'
// import { css }             from './cssReducer'
// import { navigation }      from './navigationReducer'
//
// export const combined = combineReducers({
//   html,
//   css,
//   navigation
// })
//
// export function topLevelReducer(state = { currentStep: 0, totalSteps: 0 }, action = undefined){
//   switch(action.type) {
//     case SET_CSS_SOURCE_LIST:
//       console.log("action received", action);
//       if( Object.prototype.toString.call(action.cssSourceList) )
//         return List(action.cssSourceList);
//       else if( List.isList(action.cssSourceList) )
//         return action.cssSourceList;
//       else
//         console.warn('invalid action received', action);
//       return state;
//     default:
//       //console.log("CSS: undefined action received", action);
//       return state;
//   }
// }
//