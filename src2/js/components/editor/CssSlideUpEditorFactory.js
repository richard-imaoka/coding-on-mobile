import React from 'react'
import CssDeclarationEditor from './CssDeclarationEditor'

export default function CssSlideUpEditorFactory( componentName, props, children){

  switch(componentName) {
    case CssDeclarationEditor.name :
      return React.createElement(CssDeclarationEditor, props, children);
    default:
      return <div>{"No Sucn Component = " + componentName}</div>
  }
  
}