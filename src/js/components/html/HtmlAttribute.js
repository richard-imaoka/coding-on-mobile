import React, { Component, PropTypes } from 'react'
import HtmlIndent from './HtmlIndent'

export default class HtmlAttribute extends React.Component {
  render() {
    return (
      <div className="html-attribute">
        <HtmlIndent />
        <div className="html-attribute-name">{this.props.name}</div>
        <div>&#61;</div>
        <div className="html-attribute-value"><span>&#34;</span>{this.props.value}<span>&#34;</span></div>
      </div>
    )
  }
}
HtmlAttribute.propTypes = {
  name:      PropTypes.string.isRequired,
  value:     PropTypes.string.isRequired,
  highlight: PropTypes.bool
}
