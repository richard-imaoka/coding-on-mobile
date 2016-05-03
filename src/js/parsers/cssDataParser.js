import { isBehaviorComment, parseBehaviorComment, formatCommentLine } from './cssBehaviorCommentParser'

const TYPE_COMMENT     = "comment";
const TYPE_RULE        = "rule";
const TYPE_DECLARATION = "declaration";
const TYPE_KEYFRAME    = "keyframe";
const TYPE_KEYFRAMES   = "keyframes";
const TYPE_FONTFACE    = "font-face";
const TYPE_STYLESHEET  = "stylesheet";

const DECLARATIONS_ARRAY = "declarations";
const KEYFRAMES_ARRAY    = "keyframes";
const RULES_ARRAY        = "rules";

function processDeclarationsArray(declarationsArray){
  let ret = [];

  let accumulatedBehavior = {};
  declarationsArray.forEach(function( data ) {
    if (isBehaviorComment(data)) {
      const comment  = formatCommentLine(data.comment);
      const behavior = parseBehaviorComment(comment, TYPE_DECLARATION); //(e.g.) { editableProperty: true }, single-element Object
      Object.assign(accumulatedBehavior, behavior);
    }
    else {
      ret.push(Object.assign({}, data, accumulatedBehavior));
      accumulatedBehavior = {};
    }
  });

  return ret;
}

function processKeyFramesArray(keyframesArray){
  let ret = [];

  let accumulatedBehavior = {};
  keyframesArray.forEach(function( data ) {
    if (isBehaviorComment(data)) {
      const comment  = formatCommentLine(data.comment);
      const behavior = parseBehaviorComment(comment, TYPE_KEYFRAME); //(e.g.) { editableKeyframe: true }, single-element Object
      Object.assign(accumulatedBehavior, behavior);
    }
    else {
      ret.push(Object.assign({}, processKeyFrame(data), accumulatedBehavior));
      accumulatedBehavior = {};
    }
  });

  return ret;
}

function processDataHavingDeclarationsArray(data){
  let ret = {};
  for(let key in data){
    if(key === DECLARATIONS_ARRAY)
      ret[key] = processDeclarationsArray(data[key])
    else
      ret[key] = data[key];
  }
  return ret;
}

function processRule(data) {
  return processDataHavingDeclarationsArray(data);
}

function processKeyFrame(data) {
  return processDataHavingDeclarationsArray(data);
}

function procesFontFace(data) {
  return processDataHavingDeclarationsArray(data);
}

function processKeyFrames(data){
  let ret = {};
  for(let key in data){
    if(key === KEYFRAMES_ARRAY)
      ret[key] = processKeyFramesArray(data[key])
    else
      ret[key] = data[key];
  }
  return ret;
}

function processRulesArray(rulesArray){
  let ret = [];

  let accumulatedBehavior = {};
  rulesArray.forEach(function( data ) {
    if (isBehaviorComment(data)) {
      const comment  = formatCommentLine(data.comment);
      const behavior = parseBehaviorComment(comment, TYPE_RULE); //(e.g.) { editableKeyframe: true }, single-element Object
      Object.assign(accumulatedBehavior, behavior);
    }
    else {
      //For RulesArray, is it always rule???? It doesn't look like so
      const type = data.type;
      switch(type){
        case TYPE_RULE:
          ret.push(Object.assign({}, processRule(data), accumulatedBehavior));
          accumulatedBehavior = {};
          break;
        case TYPE_KEYFRAMES:
          ret.push(Object.assign({}, processKeyFrames(data), accumulatedBehavior));
          accumulatedBehavior = {};
          break;
        case TYPE_FONTFACE:
          ret.push(Object.assign({}, procesFontFace(data), accumulatedBehavior));
          accumulatedBehavior = {};
          break;
        default:
          ret.push(Object.assign({}, data, accumulatedBehavior));
          accumulatedBehavior = {};
      }
    }
  });

  return ret;
}

function processStyleSheet(data) {
  let ret = {};
  for(let key in data){
    if(key === RULES_ARRAY)
      ret[key] = processRulesArray(data[key])
    else
      ret[key] = data[key];
  }
  return ret;
}

export function processCssData(data) {
  let ret = {};
  for(let key in data){
    if(key === TYPE_STYLESHEET)
      ret[key] = processStyleSheet(data[key])
    else
      ret[key] = data[key];
  }
  return ret;
}