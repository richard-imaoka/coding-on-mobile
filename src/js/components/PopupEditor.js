import React, { Component, PropTypes } from 'react'
import CssPropertyEditor from './css/CssPropertyEditor'

export default class App extends React.Component {
  render(){
    if(this.props.popup.rectangle === undefined)
      return(<div></div>);
    else
      return(
        <CssPropertyEditor
          store={this.props.store}
          popup={this.props.store.getState().popup}
        />
      )
  }
}