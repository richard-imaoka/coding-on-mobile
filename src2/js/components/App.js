import React, { Component, PropTypes } from 'react'
import HtmlContainer            from './html/HtmlContainer'
import CssContainer             from './css/CssContainer'
import CssSlideUpEditor         from './css/CssSlideUpEditor'
import {Result}                 from './Result'

export default class App extends React.Component {
  render() {
    return (
      <div>
        
        <div id="logo-container">
          <div id="logo">CSS Learning</div>
        </div>
        
        <div id="result-container">
          <div className="bar">Result</div>
          <Result store={this.props.store}/>
        </div>

        <HtmlContainer data={this.props.store.getHtmlData()} />

        <CssContainer store={this.props.store} data={this.props.store.getCssData()}/>

        <CssSlideUpEditor  store={this.props.store} data={this.props.store.getState().slideUp} />

      </div>
    )
  }
}