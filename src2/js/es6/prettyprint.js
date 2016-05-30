import {Map} from 'immutable'

export default function prettyPrint(jsonObj){
  if(Map.isMap(jsonObj))
    console.log( JSON.stringify(jsonObj.toJS(), null, " " ) );
  else
    console.log( JSON.stringify(jsonObj, null, " " ) )
}