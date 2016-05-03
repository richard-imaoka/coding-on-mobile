import React, { Component, PropTypes } from 'react'
import {Navigation}             from './Navigation'
import HtmlContainer            from './html/HtmlContainer'
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

        <HtmlContainer data={this.props.store.getHtmlData()} />
     
        <CssContainer  store={this.props.store} data={this.props.store.getCssData()}/>
        
      </div>
    )
   }
}