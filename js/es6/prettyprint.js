export default function prettyPrint(immutableMap){
  console.log( JSON.stringify(immutableMap.toJS(), null, " " ) )
}