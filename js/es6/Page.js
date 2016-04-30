import React, { Component, PropTypes } from 'react'
import {PrevButton, NextButton} from './LinkButton'
import {ProgressBar} from './ProgressBar'
import {HTMLNode} from './HtmlEditor'
import {CSSApp} from './CssEditor'

export default class Page extends React.Component {
  render() {
    return (
      <div>
        <div id="logo-container">
          <div><a id="logo" href="#">CSS Learning</a></div>
        </div>
        <div id="progress-container">
          <PrevButton />
          <ProgressBar />
          <NextButton />
        </div>
      </div>
    )

      //
      //   <div id="html-container">
      //     <div className="bar">HTML code</div>
      //     <HTMLNode />
      //   </div>
      //
      //   <div id="css-container">
      //     <div className="bar">CSS code</div>
      //     <CSSApp />
      //   </div>
      //
      //   <div>
      //     <div className="bar">HTML Result</div>
      //     <div><iframe id="result"></iframe></div>
      //   </div>
      //
   }
}