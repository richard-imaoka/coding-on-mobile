import React, { Component, PropTypes } from 'react'
import HtmlEditor  from './HtmlEditor'

export default class CssContainer extends React.Component {
  render() {
    return (
      <div id="html-container">
        <div className="bar">HTML code</div>
        <HtmlEditor data={this.props.data} />
      </div>
    )
  }
}

