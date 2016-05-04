const HIGHLIGHT = 'HIGHLIGHT';
const EDITABLE  = 'EDITABLE';
const GRAYOUT   = 'GRAYOUT';

const VALUE       = 'VALUE';
const PROPERTY    = 'PROPERTY';
const DECLARATION = 'DECLARATION';
const SELECTORS   = 'SELECTORS';

function isValidBehavior(behavior){
  switch( behavior.toUpperCase() ) {
    case HIGHLIGHT:
      return true;
    case EDITABLE:
      return true;
    case GRAYOUT:
      return true;
    default:
      return false;
  }
}

function isValidTarget(target){
  switch( target.toUpperCase() ) {
    case VALUE:
      return true;
    case PROPERTY:
      return true;
    case DECLARATION:
      return true;
    case SELECTORS:
      return true;
    case "":
      return true;
    default:
      return false;
  }
}

function behaviorKey(behavior, target) {
  //camelCase
  const first  = behavior.toLowerCase();
  const second = ( target === "" ) ? "" : target[0].toUpperCase() + target.substring(1, target.length).toLowerCase();
  return first + second;
}

export function isBehaviorComment(data) {
  if(data.type != "comment")
    return false;
  else {
    const [ behavior, target ] = data.comment.split(":");
    return isValidBehavior(behavior) && isValidTarget(target);
  }
}

export function parseBehaviorComment( commentLine /*BEHAVIOR:TARGET*/ ){
  let [ behavior, target ] = commentLine.split(":");
  let option  = {};
  let keyName = behaviorKey( behavior, target );
  option[ keyName ] = true;
  return option;
}

export function formatCommentLine( commentLine ) {
  return commentLine.replace( /\s/g, "" );
}

