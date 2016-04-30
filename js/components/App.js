import React, { Component, PropTypes } from 'react'
import {PrevButton, NextButton} from './LinkButton'
import {ProgressBar}            from './ProgressBar'
import {HTMLNode}               from './HtmlEditor'
import {CSSApp}                 from './CssEditor'
import {Result}                 from './Result'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div id="logo-container">
          <div id="logo">CSS Learning</div>
        </div>
        <div id="progress-container">
          <PrevButton />
          <ProgressBar />
          <NextButton />
        </div>

        <div id="html-container">
          <div className="bar">HTML code</div>
          <HTMLNode children={this.props.store.getState().html.children} tagName={"html"} textContent={"dummy"} />
        </div>

        <div id="css-container">
          <div className="bar">CSS code</div>
          <CSSApp store={this.props.store} obj={this.props.store.getState().css.toJS().stylesheet}/>
        </div>

        <div>
          <div className="bar">HTML Result</div>
          <Result store={this.props.store}/>
        </div>

      </div>
    )
   }
}