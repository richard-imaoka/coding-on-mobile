export const UPDATE_PROPERTY = 'UPDATE_PROPERTY';
export const DELETE_PROPERTY = 'DELETE_PROPERTY';

export function updateProperty( path, newValue){
  return{ type: UPDATE_PROPERTY, path: path,  value: newValue };
}

export function deleteProperty( path ){
  return{ type: DELETE_PROPERTY, path: path };
}
