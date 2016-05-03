export function newUrl(step){
  const [ baseUrl ] = window.location.href.split('?');
  return baseUrl + "?step=" + step;
};

export function getCurrentStepFromUrl(url){
  const [ baseUrl, queryStrinStep ] = window.location.href.split('?');
  if( queryStrinStep === undefined )
    return 1;
  else {
    const [query, value] = queryStrinStep.split('=');
    const number = Number(value);

    if( number === null || number === undefined)
      return 1;
    else
      return number;
  }
}