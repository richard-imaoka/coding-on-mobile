export const POPUP_EDITOR   = 'POPUP_EDITOR';
export const CLOSE_EDITOR   = 'CLOSE_EDITOR';
export const SLIDEUP_EDITOR = 'SLIDEUP_EDITOR';

export function popupEditor( rectangle, offset, path, editorType, data ){
  return{ type: POPUP_EDITOR, rectangle: rectangle, offset: offset, path: path, editorType: editorType, data: data };
}

export function closeEditor(){
  return{ type: CLOSE_EDITOR };
}

export function slideUpEditor(editorType, path){
  return{ type: SLIDEUP_EDITOR, editorType: editorType, path: path };
}