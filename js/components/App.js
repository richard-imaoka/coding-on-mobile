import React, { Component, PropTypes } from 'react'
import {Navigation}             from './Navigation'
import {HTMLNode}               from './HtmlEditor'
import CssContainer             from './css/CssContainer'
import {Result}                 from './Result'

export default class App extends React.Component {
  render() {
    return (
      <div>
        
        <div id="logo-container">
          <div id="logo">CSS Learning</div>
        </div>
        <Navigation store={this.props.store} progress={this.props.store.getProgress()}/>

        <div id="result-container">
          <div className="bar">Result</div>
          <Result store={this.props.store}/>
        </div>

        <div id="html-container">
          <div className="bar">HTML code</div>
          <div className="html-editor">
            <HTMLNode children={this.props.store.getHtmlData()} tagName={"html"} textContent={"dummy"} />
          </div>
        </div>

        <CssContainer store={this.props.store} obj={this.props.store.getCssData()}/>
        
      </div>
    )
   }
}