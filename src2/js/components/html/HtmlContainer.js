import React, { Component, PropTypes } from 'react'
import HtmlEditor  from './HtmlEditor'

export default class HtmlContainer extends React.Component {
  render() {
    return (
      <div id="html-container">
        <div className="bar">HTML code</div>
        <HtmlEditor doc={this.props.data} />
      </div>
    )
  }
}

