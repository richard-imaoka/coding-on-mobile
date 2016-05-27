import React, { Component, PropTypes } from 'react'
import { SLIDEUP_EDITOR, CLOSE_EDITOR, closeEditor } from '../../actions/popupEditorActions'

export default class CssSlideUpEditor extends React.Component {

  render(){
    // if(this.props.slideUp === undefined)
    //   return(<div></div>);
    // else
      return(
        <div className={this.className()}>
          <div onClick={this._handleClick.bind(this)}>
            <i className="fa fa-angle-double-down" ariaHidden="true"></i>
            <i className="fa fa-angle-double-down" ariaHidden="true"></i>
          </div>
        </div>
      );
  }

  className(){
    if( this.props.data.action === SLIDEUP_EDITOR )
      return "css-slideup-editor css-editor-slideUp";
    else if( this.props.data.action === CLOSE_EDITOR )
      return "css-slideup-editor css-editor-slideDown";
    else
      return "css-slideup-editor";
  }

  _handleClick(){
    this.props.store.dispatch(closeEditor());
  }
}