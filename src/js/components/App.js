import React, { Component, PropTypes } from 'react'
import {Navigation}             from './Navigation'
import HtmlContainer            from './html/HtmlContainer'
import CssContainer             from './css/CssContainer'
import {Result}                 from './Result'
import PopupEditor              from './PopupEditor'
import {closeEditor}            from  '../actions/popupEditorActions'

export default class App extends React.Component {
  render() {
    return (
      <div onClick={this._handleClick.bind(this)}>
        
        <div id="logo-container">
          <div id="logo">CSS Learning</div>
        </div>
        <Navigation store={this.props.store} progress={this.props.store.getProgress()}/>

        <div id="result-container">
          <div className="bar">Result</div>
          <Result store={this.props.store}/>
        </div>

        <HtmlContainer data={this.props.store.getHtmlData()} />
     
        <CssContainer  store={this.props.store} data={this.props.store.getCssData()}/>
        <PopupEditor
          store={this.props.store}
          popup={this.props.store.getState().popup}
        />

        <div className="css-slideup-editor">
          <div><i className="fa fa-angle-double-down" aria-hidden="true"></i><i className="fa fa-angle-double-down" aria-hidden="true"></i></div>
        </div>
      </div>
    )
   }

  //Called due to event-bubbling from inner elements, if event.stopPropagation(); is not called
  //See what components call event.stopPropagation();
  //TODO: Bad design? Knowing inner element's behavior...
  _handleClick(){
    this.props.store.dispatch(closeEditor());
  }
}