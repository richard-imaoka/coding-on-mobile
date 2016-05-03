import React, { Component, PropTypes } from 'react'
import HtmlNode  from './HtmlNode'

export default class HtmlEditor extends React.Component {
  render() {
    return (
        <div className="html-editor">
          <HtmlNode children={this.props.data} tagName={"html"} />
        </div>
    )
  }
}

