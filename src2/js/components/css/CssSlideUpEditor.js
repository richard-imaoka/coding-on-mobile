import React, { Component, PropTypes } from 'react'
import { SLIDEUP_EDITOR, CLOSE_EDITOR, closeEditor } from '../../actions/slideUpActions'

import CssSlideUpEditorFactory  from './CssSlideUpEditorFactory'
import CssSlideUpEditorCloseBar from './CssSlideUpEditorCloseBar'

export default class CssSlideUpEditor extends React.Component {

  render(){
     return(
      <div className={this.className()}>

        <CssSlideUpEditorCloseBar onClick={this._handleClick.bind(this)} />

        {
          //Dynamically change the editor type, using the factory pattern
          CssSlideUpEditorFactory(
            //1st parameter = editor type
            this.props.data.editorType,
            //2nd parameter = props
            {
              store: this.props.store,
              css  : this.props.css,
              path : this.props.data.path
            }
          )
        }

      </div>
    );
  }

  className(){
    if( this.props.data.actionType === SLIDEUP_EDITOR )
      return "css-slideup-editor css-editor-slideUp";
    else if( this.props.data.actionType === CLOSE_EDITOR )
      return "css-slideup-editor css-editor-slideDown";
    else
      return "css-slideup-editor";
  }

  _handleClick(){
    this.props.store.dispatch(closeEditor());
  }
}