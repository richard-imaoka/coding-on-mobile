const HIGHLIGHT = 'HIGHLIGHT';
const EDITABLE  = 'EDITABLE';

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
    default:
      return false;
  }
}

function isBehaviorComment(data) {
  if(data.type != "comment")
    return false;
  else {
    const [ behavior, target ] = data.comment.split(":");
    return isValidBehavior(behavior) && isValidTarget(target);
  }
}

function behaviorKey(behavior, target) {
  //camelCase
  const first  = behavior.toLowerCase();
  const second = target[0].toUpperCase() + target.substring(1, target.length).toLowerCase();
  return first + second;
}

function parseBehaviorComment( commentLine /*BEHAVIOR:TARGET*/ ){
  let [ behavior, target ] = commentLine.split(":");
  let option  = {};
  let keyName = behaviorKey( behavior, target );
  option[ keyName ] = true;
  return option;
}

function formatCommentLine( commentLine ) {
  return commentLine.replace( /\s/g, "" );
}

const COMMENT     = "comment";
const RULE        = "rule";
const DECLARATION = "declaration"

export function assignBehaviorToArray(dataArray) {
  let ret = [];

  let accumulatedBehavior = {};
  dataArray.forEach( function( data ) {
    if( isBehaviorComment(data) ) {
      const comment  = formatCommentLine(data.comment);
      const behavior = parseBehaviorComment(comment); //(e.g.) { editableProperty: true }, single-element Object
      Object.assign( accumulatedBehavior, behavior );
    }
    else {
      ret.push( Object.assign( {}, data, accumulatedBehavior ) );
      accumulatedBehavior = {};
    }
  })

  return ret;
}


// function recursive(){
//   "rules" -> recurse()
//
// }

// function a(full){
//   const ret = Object.assign({}, full);
//
//   ret.rules = assignBehaviorToArray( ret.rules );
// }
