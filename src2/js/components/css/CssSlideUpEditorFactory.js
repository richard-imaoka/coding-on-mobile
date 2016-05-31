import React from 'react'
import CssDeclarationEditor from './CssDeclarationEditor'

export default function CssSlideUpEditorFactory( componentName, props, children){
    if(componentName === CssDeclarationEditor.name )
      return React.createElement(CssDeclarationEditor);
    else
      return <div>{"No Sucn Component = " + componentName}</div>
}